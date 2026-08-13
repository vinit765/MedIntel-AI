from fastapi import APIRouter
from app.api.routers import health, auth, users  # We imported users here

api_router = APIRouter()

# Register all the sub-routers here
api_router.include_router(health.router, tags=["Health"])
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])

# Add the new users router
api_router.include_router(users.router, prefix="/users", tags=["Users"])