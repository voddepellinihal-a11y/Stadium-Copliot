from typing import List, Dict
from app.schemas.schemas import SustainabilityTip


SUSTAINABILITY_TIPS: List[SustainabilityTip] = [
    SustainabilityTip(
        category="transport",
        tip={
            "en": "Take the shuttle from the train station to reduce your carbon footprint. Shuttles run every 15 minutes from Gate B.",
            "es": "Tome el autobús desde la estación de tren para reducir su huella de carbono. Los autobuses salen cada 15 minutos desde la Puerta B.",
            "fr": "Prenez la navette depuis la gare pour réduire votre empreinte carbone. Les navettes partent toutes les 15 minutes de la Porte B.",
        },
        impact="Up to 40% reduction in parking-related emissions per trip.",
        action_link="https://stadium-copilot.com/transport",
    ),
    SustainabilityTip(
        category="transport",
        tip={
            "en": "Walking to the stadium? Use the designated pedestrian paths from downtown. It's a 15-minute walk with beautiful views!",
            "es": "¿Caminando al estadio? Use los senderos peatonales designados desde el centro. ¡Es una caminata de 15 minutos con hermosas vistas!",
            "fr": "Vous marchez jusqu'au stade ? Utilisez les sentiers piétonniers désignés depuis le centre-ville. C'est une marche de 15 minutes avec de belles vues !",
        },
        impact="Zero emissions and healthier travel choice.",
        action_link="https://stadium-copilot.com/walking-routes",
    ),
    SustainabilityTip(
        category="waste",
        tip={
            "en": "Use the refillable water stations located at every concourse. Over 10,000 plastic bottles saved per match!",
            "es": "Use las estaciones de agua recargables ubicadas en cada explanada. ¡Más de 10,000 botellas de plástico ahorradas por partido!",
            "fr": "Utilisez les stations d'eau rechargeables situées à chaque promenade. Plus de 10 000 bouteilles en plastique économisées par match !",
        },
        impact="Eliminates single-use plastic waste.",
        action_link="https://stadium-copilot.com/sustainability",
    ),
    SustainabilityTip(
        category="energy",
        tip={
            "en": "The stadium uses 100% renewable energy. LED lighting and solar panels power this event. Every fan counts!",
            "es": "El estadio utiliza 100% energía renovable. Iluminación LED y paneles solares alimentan este evento. ¡Cada fanático cuenta!",
            "fr": "Le stade utilise 100% d'énergie renouvelable. L'éclairage LED et les panneaux solaires alimentent cet événement. Chaque fan compte !",
        },
        impact="Carbon-neutral venue operations.",
        action_link=None,
    ),
    SustainabilityTip(
        category="transport",
        tip={
            "en": "Carpool with other fans! Designated carpool drop-off zones are at Parking Lot C. Share the ride, share the experience.",
            "es": "¡Comparta el coche con otros fanáticos! Las zonas designadas para dejar pasajeros están en el Estacionamiento C. Compartan el viaje, compartan la experiencia.",
            "fr": "Faites du covoiturage avec d'autres fans ! Les zones de dépose désignées pour le covoiturage sont au Parking C. Partagez le trajet, partagez l'expérience.",
        },
        impact="Reduces traffic congestion by up to 25%.",
        action_link="https://stadium-copilot.com/carpool",
    ),
]


class SustainabilityService:
    def get_tips(self, category: str = None, language: str = "en") -> List[Dict]:
        tips = SUSTAINABILITY_TIPS
        if category:
            tips = [t for t in tips if t.category == category]
        result = []
        for t in tips:
            result.append({
                "category": t.category,
                "tip": t.tip.get(language, t.tip["en"]),
                "impact": t.impact,
                "action_link": t.action_link,
            })
        return result

    def get_categories(self) -> List[str]:
        return list(set(t.category for t in SUSTAINABILITY_TIPS))

    def get_fan_score(self, actions_taken: List[str]) -> dict:
        possible = ["took_shuttle", "walked", "used_refillable", "carpooled", "public_transit"]
        score = len([a for a in actions_taken if a in possible]) / len(possible) * 100
        return {
            "score": round(score, 1),
            "actions_taken": len(actions_taken),
            "actions_possible": len(possible),
            "badge": "Green Champion" if score >= 80 else "Eco-Friendly" if score >= 50 else "Getting Started",
            "message": "Keep up the sustainable choices!",
        }

    def simulate_impact(self, crowd_count: int, actions_taken: List[str]) -> dict:
        bottles_saved = crowd_count * 2
        co2_saved_kg = crowd_count * 1.5
        return {
            "bottles_saved": bottles_saved,
            "co2_saved_kg": round(co2_saved_kg, 1),
            "equivalent_trees": round(co2_saved_kg / 21, 1),
            "message": f"With {crowd_count:,} fans making sustainable choices, we saved {bottles_saved:,} plastic bottles and {co2_saved_kg:.0f}kg of CO₂!",
        }
