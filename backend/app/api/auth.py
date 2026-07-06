from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from app.core.security import authenticate_user, create_access_token, fake_users_db, get_current_active_user
from app.models.user import User, Token
from app.core.config import settings

router = APIRouter(prefix="/api/auth")


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user["username"], "role": user["role"], "city": user["city"]}, expires_delta=access_token_expires)
    return Token(access_token=access_token)


@router.get("/me", response_model=User)
async def read_users_me(current_user=Depends(get_current_active_user)):
    return User(**current_user)
