import random
import json
import asyncio
from datetime import datetime
from typing import Dict, List, Optional
from app.schemas.schemas import CrowdData, RouteRecommendation

STADIUM_ZONES = {
    "metlife": {
        "zones": ["gate_a", "gate_b", "gate_c", "concourse_a", "concourse_b", "concourse_c",
                   "section_101", "section_115", "section_120", "section_201",
                   "parking_a", "parking_b", "train_station", "bus_stop"],
        "adjacency": {
            "gate_a": ["parking_a", "concourse_a", "section_101"],
            "gate_b": ["train_station", "concourse_b", "section_115"],
            "gate_c": ["bus_stop", "concourse_c", "section_120"],
            "concourse_a": ["gate_a", "section_101", "food_court_a"],
            "concourse_b": ["gate_b", "section_115", "food_court_b"],
            "concourse_c": ["gate_c", "section_120", "section_201"],
        }
    }
}

CROWD_THRESHOLDS = {
    "low": 0.3,
    "medium": 0.6,
    "high": 0.85,
}


class CrowdService:
    def __init__(self):
        self.crowd_data: Dict[str, Dict[str, CrowdData]] = {}
        self._init_crowd_data()

    def _init_crowd_data(self):
        for stadium, config in STADIUM_ZONES.items():
            self.crowd_data[stadium] = {}
            for zone in config["zones"]:
                capacity = random.randint(200, 1500)
                self.crowd_data[stadium][zone] = CrowdData(
                    zone=zone,
                    density=random.uniform(0.1, 0.4),
                    capacity=capacity,
                    current_count=int(capacity * random.uniform(0.1, 0.4)),
                    trend=random.choice(["stable", "increasing", "decreasing"]),
                    timestamp=datetime.now(),
                )

    def simulate_update(self, stadium: str = "metlife"):
        if stadium not in self.crowd_data:
            return
        for zone, data in self.crowd_data[stadium].items():
            delta = random.uniform(-0.15, 0.15)
            new_density = max(0.0, min(1.0, data.density + delta))
            trend = "increasing" if delta > 0.05 else ("decreasing" if delta < -0.05 else "stable")

            # Simulate event time patterns
            hour = datetime.now().hour
            if 14 <= hour <= 16:  # Pre-match ingress
                new_density = min(1.0, new_density + 0.1)
            elif 17 <= hour <= 19:  # During match - gates lower
                if "gate" in zone:
                    new_density = max(0.0, new_density - 0.2)

            self.crowd_data[stadium][zone] = CrowdData(
                zone=zone,
                density=round(new_density, 2),
                capacity=data.capacity,
                current_count=int(data.capacity * new_density),
                trend=trend,
                timestamp=datetime.now(),
            )

    def get_crowd_data(self, stadium: str = "metlife") -> List[CrowdData]:
        self.simulate_update(stadium)
        if stadium not in self.crowd_data:
            return []
        return list(self.crowd_data[stadium].values())

    def get_congestion_summary(self, stadium: str = "metlife") -> dict:
        data = self.get_crowd_data(stadium)
        high = [d for d in data if d.density >= CROWD_THRESHOLDS["high"]]
        medium = [d for d in data if CROWD_THRESHOLDS["medium"] <= d.density < CROWD_THRESHOLDS["high"]]
        low = [d for d in data if d.density < CROWD_THRESHOLDS["medium"]]

        return {
            "total_zones": len(data),
            "high_congestion": len(high),
            "medium_congestion": len(medium),
            "low_congestion": len(low),
            "hotspots": [{"zone": d.zone, "density": d.density, "trend": d.trend} for d in high],
            "timestamp": datetime.now().isoformat(),
        }

    def get_route_recommendation(self, from_zone: str, to_zone: str, stadium: str = "metlife") -> RouteRecommendation:
        config = STADIUM_ZONES.get(stadium, {})
        adjacency = config.get("adjacency", {})

        priority_queue = [(from_zone, [from_zone])]
        visited = set()

        while priority_queue:
            current, path = priority_queue.pop(0)
            if current == to_zone:
                primary = " -> ".join(path)
                data = self.crowd_data.get(stadium, {})
                congestion = max((data.get(z, CrowdData(zone=z, density=0, capacity=1, current_count=0, trend="stable")).density for z in path), default=0)
                level = "low"
                if congestion >= CROWD_THRESHOLDS["high"]:
                    level = "high"
                elif congestion >= CROWD_THRESHOLDS["medium"]:
                    level = "medium"
                return RouteRecommendation(
                    from_zone=from_zone,
                    to_zone=to_zone,
                    primary_route=primary,
                    estimated_time=len(path) * 3,
                    congestion_level=level,
                    accessibility_route=primary,
                )

            visited.add(current)
            for neighbor in adjacency.get(current, []):
                if neighbor not in visited:
                    priority_queue.append((neighbor, path + [neighbor]))

        return RouteRecommendation(
            from_zone=from_zone,
            to_zone=to_zone,
            primary_route=f"{from_zone} -> {to_zone}",
            estimated_time=10,
            congestion_level="medium",
        )
