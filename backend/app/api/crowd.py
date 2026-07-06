from fastapi import APIRouter, Depends
from typing import List, Optional
from app.schemas.schemas import CrowdData, RouteRecommendation
from app.services.crowd_service import CrowdService
from app.core.security import get_current_active_user

router = APIRouter(prefix="/api/crowd")
crowd_service = CrowdService()


@router.get("/zones", response_model=List[CrowdData])
async def get_crowd_zones(stadium: str = "metlife", current_user=Depends(get_current_active_user)):
    return crowd_service.get_crowd_data(stadium)


@router.get("/summary")
async def get_crowd_summary(stadium: str = "metlife", current_user=Depends(get_current_active_user)):
    return crowd_service.get_congestion_summary(stadium)


@router.get("/route")
async def get_route(from_zone: str, to_zone: str, stadium: str = "metlife",
                    current_user=Depends(get_current_active_user)):
    return crowd_service.get_route_recommendation(from_zone, to_zone, stadium)
