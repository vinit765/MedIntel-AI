from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.auth import UserCreate, LoginRequest, TokenResponse, UserRead
from app.repositories import user_repository
from app.core.security import verify_password, create_access_token

def register_new_user(db: Session, user_data: UserCreate) -> UserRead:
    # 1. Check if user already exists
    existing_user = user_repository.get_user_by_email(db, email=user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered in the clinical system."
        )
    
    # 2. Create and return the user
    new_user = user_repository.create_user(db=db, user=user_data)
    return new_user

def authenticate_user(db: Session, login_data: LoginRequest) -> TokenResponse:
    # 1. Fetch user by email
    user = user_repository.get_user_by_email(db, email=login_data.email)
    
    # 2. Verify existence and password
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid clinical credentials."
        )
    
    # 3. Generate JWT Token using the subject function you defined
    access_token = create_access_token(subject=user.email)
    
    # 4. Return token and user data matching the TokenResponse schema
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=user
    )