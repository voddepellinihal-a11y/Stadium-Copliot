from fastapi import APIRouter, Depends
from typing import Optional
from app.schemas.schemas import SustainabilityTip
from app.services.sustainability_service import SustainabilityService
from app.core.security import get_current_active_user

router = APIRouter(prefix="/api/sustainability")
sust_service = SustainabilityService()


@router.get("/tips")
async def get_sustainability_tips(category: Optional[str] = None, language: str = "en",
                                   current_user=Depends(get_current_active_user)):
    return sust_service.get_tips(category, language)


@router.get("/categories")
async def get_categories(current_user=Depends(get_current_active_user)):
    return {"categories": sust_service.get_categories()}


@router.get("/impact")
async def get_impact(crowd_count: int = 10000, actions_taken: str = "took_shuttle,walked,used_refillable",
                      current_user=Depends(get_current_active_user)):
    actions_list = actions_taken.split(",") if actions_taken else []
    return sust_service.simulate_impact(crowd_count, actions_list)


@router.get("/score")
async def get_fan_score(actions_taken: str = "took_shuttle,walked",
                         current_user=Depends(get_current_active_user)):
    actions_list = actions_taken.split(",") if actions_taken else []
    return sust_service.get_fan_score(actions_list)
