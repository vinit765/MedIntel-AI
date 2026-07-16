from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.repositories.user_repository import UserRepository
from app.schemas.auth import LoginRequest, TokenResponse, UserCreate


class DuplicateUserError(Exception):
    pass


class InvalidCredentialsError(Exception):
    pass


class AuthService:
    def __init__(self, db: Session) -> None:
        self.users = UserRepository(db)

    def register_user(self, payload: UserCreate):
        existing_user = self.users.get_by_email(payload.email)
        if existing_user is not None:
            raise DuplicateUserError("An account with this email already exists.")

        return self.users.create(
            email=payload.email,
            full_name=payload.full_name.strip(),
            hashed_password=hash_password(payload.password),
        )

    def authenticate_user(self, payload: LoginRequest) -> TokenResponse:
        user = self.users.get_by_email(payload.email)
        if user is None or not verify_password(payload.password, user.hashed_password):
            raise InvalidCredentialsError("Invalid email or password.")

        access_token = create_access_token(subject=user.id)
        return TokenResponse(access_token=access_token, user=user)
