from fastapi import APIRouter, HTTPException
from app.schemas.schemas import ChatRequest, ChatResponse
from app.services.rag_service import generate_response
from datetime import datetime

router = APIRouter(prefix="/api")


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    start = datetime.now()
    result = await generate_response(
        question=request.question,
        language=request.language,
        city=request.city,
        section=request.section,
    )
    return ChatResponse(**result)
