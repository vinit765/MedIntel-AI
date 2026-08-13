from sqlalchemy.orm import Session
from app.database.models import User
from app.schemas.auth import UserCreate
from app.core.security import hash_password

def get_user_by_email(db: Session, email: str) -> User | None:
    """Fetches a user from the database by email."""
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate) -> User:
    """Hashes the password and saves a new user to the database."""
    hashed_pwd = hash_password(user.password)
    
    db_user = User(
        email=user.email,
        hashed_password=hashed_pwd,
        full_name=user.full_name,
        role="clinician"  # Default role
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user