from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.schemas.auth import UserCreate, LoginRequest, TokenResponse, UserRead
from app.database.session import get_db
from app.services import auth_service

router = APIRouter()

@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
    """
    Registers a new clinician in the system.
    """
    return auth_service.register_new_user(db, user)

@router.post("/login", response_model=TokenResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    """
    Authenticates a clinician and returns a JWT access token.
    """
    return auth_service.authenticate_user(db, credentials)