import google.generativeai as genai
from app.core.config import settings
from app.db.chroma_client import query_knowledge
import json
import os

EMERGENCY_KEYWORDS = {
    "en": ["fire", "medical", "emergency", "help", "doctor", "hospital", "police", "ambulance", "heart attack", "bleeding", "unconscious"],
    "es": ["fuego", "médico", "urgencia", "ayuda", "doctor", "hospital", "policía", "ambulancia", "ataque cardíaco", "sangrado", "inconsciente"],
    "fr": ["incendie", "médical", "urgence", "aide", "docteur", "hôpital", "police", "ambulance", "crise cardiaque", "saignement", "inconscient"],
}

EMERGENCY_RESPONSES = {
    "en": "🚨 EMERGENCY DETECTED: Please stay calm. A staff member is being notified to your location immediately. If you need immediate assistance, call 911. For medical help, proceed to the nearest First Aid station or alert the nearest volunteer.",
    "es": "🚨 EMERGENCIA DETECTADA: Mantenga la calma. Un miembro del personal está siendo notificado a su ubicación inmediatamente. Si necesita asistencia inmediata, llame al 911. Para ayuda médica, diríjase a la estación de Primeros Auxilios más cercana o avise al voluntario más cercano.",
    "fr": "🚨 URGENCE DÉTECTÉE: Restez calme. Un membre du personnel est averti de se rendre immédiatement à votre position. Si vous avez besoin d'aide immédiate, appelez le 112. Pour une aide médicale, rendez-vous au poste de Premiers Secours le plus proche ou alertez le bénévole le plus proche.",
}

SYSTEM_PROMPTS = {
    "en": """You are Stadium Copilot, an AI assistant for the FIFA World Cup 2026. Your purpose is to help fans navigate stadiums, find amenities, answer questions, and enhance their tournament experience.

CRITICAL RULES:
1. ONLY use information provided in the context below. Do not make up information.
2. If information is not in the context, say: "I don't have that specific information. Please ask a volunteer for assistance."
3. Keep responses under 120 words unless the user asks for more details.
4. Use simple, clear language suitable for a diverse international audience.
5. Be friendly, helpful, and concise.
6. When giving directions, mention landmarks and walking times when possible.
7. For accessibility questions, always prioritize step-free routes and accessible amenities.

CONTEXT:
""",
    "es": """Eres Stadium Copilot, un asistente de IA para la Copa Mundial de la FIFA 2026. Tu propósito es ayudar a los fanáticos a navegar por los estadios, encontrar servicios, responder preguntas y mejorar su experiencia en el torneo.

REGLAS CRÍTICAS:
1. SOLO usa información proporcionada en el contexto a continuación. No inventes información.
2. Si la información no está en el contexto, di: "No tengo esa información específica. Por favor, pide ayuda a un voluntario."
3. Mantén las respuestas en menos de 120 palabras a menos que el usuario pida más detalles.
4. Usa un lenguaje simple y claro adecuado para una audiencia internacional diversa.
5. Sé amable, útil y conciso.
6. Al dar direcciones, menciona puntos de referencia y tiempos de caminata cuando sea posible.
7. Para preguntas de accesibilidad, prioriza siempre las rutas sin escaleras y los servicios accesibles.

CONTEXTO:
""",
    "fr": """Vous êtes Stadium Copilot, un assistant IA pour la Coupe du Monde de la FIFA 2026. Votre but est d'aider les fans à naviguer dans les stades, trouver des services, répondre aux questions et améliorer leur expérience du tournoi.

RÈGLES CRITIQUES:
1. Utilisez UNIQUEMENT les informations fournies dans le contexte ci-dessous. N'inventez pas d'informations.
2. Si l'information n'est pas dans le contexte, dites: "Je n'ai pas cette information spécifique. Veuillez demander de l'aide à un bénévole."
3. Gardez les réponses en moins de 120 mots sauf si l'utilisateur demande plus de détails.
4. Utilisez un langage simple et clair adapté à un public international diversifié.
5. Soyez amical, utile et concis.
6. Lorsque vous donnez des directions, mentionnez des points de repère et des temps de marche lorsque c'est possible.
7. Pour les questions d'accessibilité, priorisez toujours les routes sans marches et les services accessibles.

CONTEXTE:
""",
}


def detect_emergency(text: str, language: str = "en") -> bool:
    keywords = EMERGENCY_KEYWORDS.get(language, EMERGENCY_KEYWORDS["en"])
    text_lower = text.lower()
    for kw in keywords:
        if kw in text_lower:
            return True
    return False


def get_emergency_response(language: str = "en") -> str:
    return EMERGENCY_RESPONSES.get(language, EMERGENCY_RESPONSES["en"])


def build_prompt(question: str, context: str, language: str = "en") -> str:
    system = SYSTEM_PROMPTS.get(language, SYSTEM_PROMPTS["en"])
    return f"{system}\n{context}\n\nUSER QUESTION: {question}\n\nYour response:"


async def generate_response(question: str, language: str = "en", city: str = "metlife", section: str = None) -> dict:
    if detect_emergency(question, language):
        return {
            "response": get_emergency_response(language),
            "is_emergency": True,
            "context_used": [],
            "confidence": 1.0,
            "sources": ["emergency_protocol"],
        }

    try:
        results = query_knowledge(question, n_results=5)
        documents = results["documents"][0] if results["documents"] else []
        metadatas = results["metadatas"][0] if results["metadatas"] else []

        context = "\n".join(documents) if documents else "No specific information found."
        sources = [m.get("source", "") for m in metadatas if m] if metadatas else []

        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            model = genai.GenerativeModel("gemini-pro")
            prompt = build_prompt(question, context, language)
            response = model.generate_content(prompt)
            text = response.text
        else:
            text = _fallback_response(question, context, language)

        return {
            "response": text,
            "is_emergency": False,
            "context_used": documents,
            "confidence": 1.0 if documents else 0.6,
            "sources": sources,
        }

    except Exception as e:
        return {
            "response": f"I'm having trouble processing your request. Please try again or ask a volunteer for help.",
            "is_emergency": False,
            "context_used": [],
            "confidence": 0.0,
            "sources": [],
        }


def _fallback_response(question: str, context: str, language: str = "en") -> str:
    question_lower = question.lower()

    if "restroom" in question_lower or "toilet" in question_lower or "bathroom" in question_lower:
        return "Restrooms are available near every section. The nearest restroom is at Section 102 (accessible) and Section 115. Look for the restroom signs along the concourse."

    if "gate" in question_lower:
        return "Gates are located around the stadium perimeter. Gate A serves sections 101-110 (near Parking A), Gate B serves 111-120 (near Train Station), Gate C serves 121-130 (near Bus Stop)."

    if "food" in question_lower or "eat" in question_lower:
        return "There's a Pizza Stand on Concourse A (Italian) and a Burger Bar on Concourse B (American). More food options are available throughout all concourses."

    if "wheelchair" in question_lower or "accessible" in question_lower:
        return "All concourses are wheelchair accessible. Elevators are located near every gate. Wheelchair assistance is available at all gates. Please request at the entrance."

    if context and context != "No specific information found.":
        return f"Based on available information: {context}"

    return "I don't have that specific information. Please ask a volunteer for assistance."
