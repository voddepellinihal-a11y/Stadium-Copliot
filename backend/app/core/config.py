from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    APP_NAME: str = "Stadium Copilot 2026"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Gemini
    GEMINI_API_KEY: str = ""

    # Redis
    REDIS_URL: str = "redis://localhost:6379"

    # JWT
    SECRET_KEY: str = "stadium-copilot-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480

    # ChromaDB
    CHROMA_PERSIST_DIR: str = "./chroma_db"

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "https://stadium-copilot.vercel.app"]

    # Cities
    CITIES: dict = {
        "metlife": {
            "name": "MetLife Stadium",
            "location": "East Rutherford, NJ, USA",
            "country": "USA",
            "languages": ["en", "es"],
        },
        "sofi": {
            "name": "SoFi Stadium",
            "location": "Inglewood, CA, USA",
            "country": "USA",
            "languages": ["en", "es"],
        },
        "azteca": {
            "name": "Estadio Azteca",
            "location": "Mexico City, Mexico",
            "country": "Mexico",
            "languages": ["es", "en"],
        },
        "bc_place": {
            "name": "BC Place",
            "location": "Vancouver, BC, Canada",
            "country": "Canada",
            "languages": ["en", "fr"],
        },
    }

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
