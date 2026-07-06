from fastapi import APIRouter, Depends, Query
from typing import Optional
from app.schemas.schemas import AnalyticsResponse
from app.services.analytics_service import AnalyticsService
from app.core.security import get_current_active_user

router = APIRouter(prefix="/api/analytics")
analytics_service = AnalyticsService()


@router.get("/{metric}", response_model=AnalyticsResponse)
async def get_analytics(
    metric: str,
    city: Optional[str] = Query(None),
    current_user=Depends(get_current_active_user),
):
    return analytics_service.get_analytics(metric, city)
