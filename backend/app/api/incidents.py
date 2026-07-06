from fastapi import APIRouter, Depends
from typing import Optional
from app.schemas.schemas import Incident, EmergencyAlert
from app.services.analytics_service import AnalyticsService
from app.core.security import get_current_active_user
from datetime import datetime

router = APIRouter(prefix="/api/incidents")
analytics_service = AnalyticsService()

incidents_db = {}


@router.get("/")
async def list_incidents(status: Optional[str] = None, city: Optional[str] = None,
                          current_user=Depends(get_current_active_user)):
    incidents = list(incidents_db.values())
    if status:
        incidents = [i for i in incidents if i.status == status]
    return incidents


@router.post("/")
async def create_incident(alert: EmergencyAlert, current_user=Depends(get_current_active_user)):
    inc_id = f"inc_{len(incidents_db) + 1}"
    incident = Incident(
        id=inc_id,
        type=alert.type,
        location=alert.location,
        description=alert.description,
        severity=alert.severity,
        reported_by=alert.reported_by,
        status="open",
        created_at=datetime.now(),
    )
    incidents_db[inc_id] = incident
    analytics_service.log_incident(alert.type, alert.location, alert.severity, alert.description)
    return incident


@router.get("/{incident_id}")
async def get_incident(incident_id: str, current_user=Depends(get_current_active_user)):
    incident = incidents_db.get(incident_id)
    if not incident:
        return {"error": "Incident not found"}
    return incident
