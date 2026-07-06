from fastapi import APIRouter, Depends
from typing import Optional, List
from app.schemas.schemas import Notification
from app.core.security import get_current_active_user
from datetime import datetime

router = APIRouter(prefix="/api/notifications")

notifications_db: dict = {}

for i in range(5):
    nid = f"notif_{i}"
    types = ["info", "warning", "alert", "success", "info"]
    titles_en = ["Welcome to the Stadium!", "Gate Change Alert", "Weather Advisory", "Match Update", "Transport Reminder"]
    titles_es = ["¡Bienvenido al Estadio!", "Alerta de Cambio de Puerta", "Aviso Meteorológico", "Actualización del Partido", "Recordatorio de Transporte"]
    titles_fr = ["Bienvenue au Stade!", "Alerte de Changement de Porte", "Avis Météo", "Mise à Jour du Match", "Rappel de Transport"]
    msgs_en = [
        "Scan your digital ticket for fastest entry. Gates open 2 hours before kickoff!",
        "Gate C is temporarily closed due to crowding. Please use Gate B or Gate A.",
        "Light rain expected during the match. Umbrellas are not permitted but ponchos are available at Fan Zones.",
        "The match is now starting at 4:00 PM due to broadcast scheduling.",
        "Last train departs at 11:30 PM. Plan your exit accordingly.",
    ]
    msgs_es = [
        "Escanea tu boleto digital para entrada más rápida. ¡Las puertas abren 2 horas antes del partido!",
        "La Puerta C está temporalmente cerrada por aglomeración. Use la Puerta B o la Puerta A.",
        "Se espera lluvia ligera durante el partido. No se permiten paraguas pero hay ponchos disponibles en las Zonas de Fanáticos.",
        "El partido comenzará a las 4:00 PM debido a la programación de transmisión.",
        "El último tren sale a las 11:30 PM. Planifique su salida en consecuencia.",
    ]
    msgs_fr = [
        "Scannez votre billet numérique pour une entrée plus rapide. Les portes ouvrent 2 heures avant le coup d'envoi!",
        "La Porte C est temporairement fermée en raison de l'affluence. Veuillez utiliser la Porte B ou la Porte A.",
        "Pluie légère attendue pendant le match. Les parapluies ne sont pas autorisés mais des ponchos sont disponibles dans les Zones Fans.",
        "Le match commence maintenant à 16h00 en raison de la programmation de diffusion.",
        "Le dernier train part à 23h30. Planifiez votre sortie en conséquence.",
    ]
    notifications_db[nid] = Notification(
        id=nid,
        type=types[i],
        title={"en": titles_en[i], "es": titles_es[i], "fr": titles_fr[i]},
        message={"en": msgs_en[i], "es": msgs_es[i], "fr": msgs_fr[i]},
        audience="all",
        city=None,
        priority=i,
        created_at=datetime.now(),
        expires_at=None,
    )


@router.get("/")
async def list_notifications(audience: Optional[str] = None, city: Optional[str] = None,
                              current_user=Depends(get_current_active_user)):
    notifs = list(notifications_db.values())
    if audience:
        notifs = [n for n in notifs if n.audience in ("all", audience)]
    if city:
        notifs = [n for n in notifs if n.city is None or n.city == city]
    return sorted(notifs, key=lambda n: n.priority, reverse=True)


@router.get("/{notification_id}")
async def get_notification(notification_id: str, current_user=Depends(get_current_active_user)):
    notif = notifications_db.get(notification_id)
    if not notif:
        return {"error": "Notification not found"}
    return notif
