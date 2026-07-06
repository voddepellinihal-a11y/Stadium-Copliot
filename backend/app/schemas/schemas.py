from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


class ChatRequest(BaseModel):
    question: str
    language: str = "en"
    city: str = "metlife"
    section: Optional[str] = None
    user_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    is_emergency: bool = False
    context_used: List[str] = []
    confidence: float = 1.0
    sources: List[str] = []


class EmergencyAlert(BaseModel):
    type: str  # medical, fire, security, other
    location: str
    description: str
    severity: str = "medium"  # low, medium, high, critical
    reported_by: Optional[str] = None
    timestamp: datetime = datetime.now()


class Incident(BaseModel):
    id: str
    type: str
    location: str
    description: str
    status: str = "open"  # open, investigating, resolved
    severity: str = "medium"
    reported_by: Optional[str] = None
    assigned_to: Optional[str] = None
    created_at: datetime = datetime.now()
    resolved_at: Optional[datetime] = None


class CrowdData(BaseModel):
    zone: str
    density: float  # 0.0 to 1.0
    capacity: int
    current_count: int
    trend: str = "stable"  # increasing, decreasing, stable
    timestamp: datetime = datetime.now()


class RouteRecommendation(BaseModel):
    from_zone: str
    to_zone: str
    primary_route: str
    alternative_route: Optional[str] = None
    estimated_time: int  # minutes
    congestion_level: str  # low, medium, high
    accessibility_route: Optional[str] = None


class AnalyticsQuery(BaseModel):
    metric: str
    city: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None


class AnalyticsResponse(BaseModel):
    metric: str
    data: Dict[str, Any]
    period: str
    summary: str


class SustainabilityTip(BaseModel):
    category: str  # transport, waste, energy, water
    tip: Dict[str, str]  # en, es, fr
    impact: str
    action_link: Optional[str] = None


class Notification(BaseModel):
    id: str
    type: str  # alert, info, warning, success
    title: Dict[str, str]
    message: Dict[str, str]
    audience: str  # all, fans, volunteers, operators
    city: Optional[str] = None
    priority: int = 0
    created_at: datetime = datetime.now()
    expires_at: Optional[datetime] = None
