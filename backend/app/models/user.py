from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


class User(BaseModel):
    username: str
    full_name: str
    email: str
    role: str
    city: str
    disabled: bool = False


class UserInDB(User):
    hashed_password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    username: Optional[str] = None
    role: Optional[str] = None
    city: Optional[str] = None
