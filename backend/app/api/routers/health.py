from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health_check():
    return {
        "status": "Online", 
        "message": "MedIntel API is securely connected and running."
    }