from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    APP_NAME: str = "Stadium Copilot 2026"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

    # Gemini
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

    # Redis
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")

    # JWT - read from env, never hardcode
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-only-not-for-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480

    # ChromaDB
    CHROMA_PERSIST_DIR: str = os.getenv("CHROMA_PERSIST_DIR", "./chroma_db")

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "https://stadium-copilot.vercel.app"]

    # FIFA World Cup 2026 Cities
    CITIES: dict = {
        "metlife": {"name": "MetLife Stadium", "location": "East Rutherford, NJ, USA", "country": "USA", "languages": ["en", "es"], "capacity": 82500},
        "sofi": {"name": "SoFi Stadium", "location": "Inglewood, CA, USA", "country": "USA", "languages": ["en", "es"], "capacity": 70240},
        "azteca": {"name": "Estadio Azteca", "location": "Mexico City, Mexico", "country": "Mexico", "languages": ["es", "en"], "capacity": 87523},
        "bc_place": {"name": "BC Place", "location": "Vancouver, BC, Canada", "country": "Canada", "languages": ["en", "fr"], "capacity": 54500},
        "arrowhead": {"name": "Arrowhead Stadium", "location": "Kansas City, MO, USA", "country": "USA", "languages": ["en", "es"], "capacity": 76416},
        "at_t_stadium": {"name": "AT&T Stadium", "location": "Arlington, TX, USA", "country": "USA", "languages": ["en", "es"], "capacity": 80000},
        "hard_rock": {"name": "Hard Rock Stadium", "location": "Miami Gardens, FL, USA", "country": "USA", "languages": ["en", "es"], "capacity": 65000},
        "lincoln_financial": {"name": "Lincoln Financial Field", "location": "Philadelphia, PA, USA", "country": "USA", "languages": ["en", "es"], "capacity": 69176},
        "nrg": {"name": "NRG Stadium", "location": "Houston, TX, USA", "country": "USA", "languages": ["en", "es"], "capacity": 72220},
        "lumen": {"name": "Lumen Field", "location": "Seattle, WA, USA", "country": "USA", "languages": ["en", "es"], "capacity": 68740},
        "mercedes_benz": {"name": "Mercedes-Benz Stadium", "location": "Atlanta, GA, USA", "country": "USA", "languages": ["en", "es"], "capacity": 71000},
        "gillette": {"name": "Gillette Stadium", "location": "Foxborough, MA, USA", "country": "USA", "languages": ["en", "es"], "capacity": 65878},
        "cotton_bowl": {"name": "Cotton Bowl", "location": "Dallas, TX, USA", "country": "USA", "languages": ["en", "es"], "capacity": 92100},
    }

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
