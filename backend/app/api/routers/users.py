from fastapi import APIRouter, Depends
from app.schemas.auth import UserRead
from app.database.models import User
from app.api.dependencies import get_current_user

router = APIRouter()

# Notice we use the `Depends(get_current_user)` lock right here!
@router.get("/me", response_model=UserRead)
def get_user_profile(current_user: User = Depends(get_current_user)):
    """
    Fetch the currently logged-in user's profile information.
    The user must send a valid JWT token in the Authorization header.
    """
    return current_user