import random
from datetime import datetime, timedelta
from typing import Dict, List, Any
from collections import defaultdict


class AnalyticsService:
    def __init__(self):
        self.query_log: List[Dict] = []
        self.incident_log: List[Dict] = []
        self._seed_data()

    def _seed_data(self):
        sample_queries = [
            "Where is the nearest restroom?",
            "How do I get to Gate G?",
            "What time does the match start?",
            "Where can I find food?",
            "Is there wheelchair access?",
            "Where is the nearest exit?",
            "Can I bring a bag?",
            "Where is the medical center?",
            "How do I get to the train station?",
            "What food options are available?",
        ]
        languages = ["en", "es", "fr"]
        sections = ["101", "115", "120", "201", "210"]

        for i in range(200):
            days_ago = random.randint(0, 30)
            minutes_ago = random.randint(0, 1440)
            ts = datetime.now() - timedelta(days=days_ago, minutes=minutes_ago)
            resolved = random.random() > 0.2
            self.query_log.append({
                "id": f"q_{i}",
                "question": random.choice(sample_queries),
                "language": random.choice(languages),
                "section": random.choice(sections),
                "city": "metlife",
                "response_time_ms": random.randint(200, 3000),
                "was_emergency": random.random() > 0.95,
                "was_resolved": resolved,
                "confidence": round(random.uniform(0.3, 1.0), 2),
                "timestamp": ts.isoformat(),
            })

        incident_types = ["medical", "security", "facility", "crowding", "noise"]
        for i in range(50):
            days_ago = random.randint(0, 30)
            minutes_ago = random.randint(0, 1440)
            ts = datetime.now() - timedelta(days=days_ago, minutes=minutes_ago)
            resolved = random.random() > 0.3
            self.incident_log.append({
                "id": f"inc_{i}",
                "type": random.choice(incident_types),
                "location": f"Section {random.choice(sections)}",
                "severity": random.choice(["low", "medium", "high", "critical"]),
                "status": "resolved" if resolved else "open",
                "created_at": ts.isoformat(),
                "resolved_at": (ts + timedelta(minutes=random.randint(10, 120))).isoformat() if resolved else None,
            })

    def log_query(self, question: str, language: str, city: str, response_time_ms: int,
                  was_emergency: bool, was_resolved: bool, confidence: float):
        self.query_log.append({
            "id": f"q_{len(self.query_log)}",
            "question": question,
            "language": language,
            "city": city,
            "response_time_ms": response_time_ms,
            "was_emergency": was_emergency,
            "was_resolved": was_resolved,
            "confidence": confidence,
            "timestamp": datetime.now().isoformat(),
        })

    def log_incident(self, incident_type: str, location: str, severity: str, description: str):
        self.incident_log.append({
            "id": f"inc_{len(self.incident_log)}",
            "type": incident_type,
            "location": location,
            "severity": severity,
            "description": description,
            "status": "open",
            "created_at": datetime.now().isoformat(),
        })

    def get_analytics(self, metric: str, city: str = None) -> Dict[str, Any]:
        filtered_q = self.query_log
        filtered_i = self.incident_log
        if city:
            filtered_q = [q for q in filtered_q if q["city"] == city]

        if metric == "top_questions":
            counts = defaultdict(int)
            for q in filtered_q:
                counts[q["question"]] += 1
            sorted_q = sorted(counts.items(), key=lambda x: -x[1])[:10]
            return {"metric": metric, "data": dict(sorted_q), "period": "all time",
                    "summary": f"Most common questions from {len(filtered_q)} total queries"}

        elif metric == "response_times":
            times = [q["response_time_ms"] for q in filtered_q]
            avg = sum(times) / len(times) if times else 0
            p95 = sorted(times)[int(len(times) * 0.95)] if times else 0
            return {"metric": metric, "data": {"avg_ms": round(avg, 1), "p95_ms": p95, "total": len(times)},
                    "period": "all time", "summary": f"Average response: {avg:.0f}ms. P95: {p95}ms"}

        elif metric == "language_breakdown":
            counts = defaultdict(int)
            for q in filtered_q:
                counts[q["language"]] += 1
            return {"metric": metric, "data": dict(counts), "period": "all time",
                    "summary": f"Query distribution across {len(counts)} languages"}

        elif metric == "emergency_stats":
            emergencies = [q for q in filtered_q if q["was_emergency"]]
            return {"metric": metric, "data": {"total_emergencies": len(emergencies), "total_queries": len(filtered_q)},
                    "period": "all time", "summary": f"{len(emergencies)} emergency events detected"}

        elif metric == "incident_summary":
            types = defaultdict(int)
            for i in filtered_i:
                types[i["type"]] += 1
            open_incidents = sum(1 for i in filtered_i if i["status"] == "open")
            return {"metric": metric, "data": {"by_type": dict(types), "open": open_incidents, "total": len(filtered_i)},
                    "period": "all time", "summary": f"{len(filtered_i)} incidents, {open_incidents} open"}

        elif metric == "resolution_rate":
            resolved = sum(1 for q in filtered_q if q["was_resolved"])
            total = len(filtered_q)
            rate = (resolved / total * 100) if total else 0
            return {"metric": metric, "data": {"resolved": resolved, "total": total, "rate_pct": round(rate, 1)},
                    "period": "all time", "summary": f"{rate:.0f}% resolution rate"}
        else:
            return {"metric": metric, "data": {"total_queries": len(filtered_q)},
                    "period": "all time", "summary": f"Total queries: {len(filtered_q)}"}
