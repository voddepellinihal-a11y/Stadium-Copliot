from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.chroma_client import init_chroma
from app.api import chat, auth, crowd, analytics, sustainability, incidents, notifications
import json
import asyncio

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)
app.include_router(auth.router)
app.include_router(crowd.router)
app.include_router(analytics.router)
app.include_router(sustainability.router)
app.include_router(incidents.router)
app.include_router(notifications.router)


@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "cities": list(settings.CITIES.keys()),
    }


@app.get("/api/cities")
async def get_cities():
    return settings.CITIES


@app.on_event("startup")
async def startup_event():
    try:
        init_chroma()
        print("✓ ChromaDB initialized")
    except Exception as e:
        print(f"⚠ ChromaDB init warning: {e}")

    print(f"✓ {settings.APP_NAME} v{settings.APP_VERSION} started")
