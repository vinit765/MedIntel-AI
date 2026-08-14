from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.database.models import User
from app.schemas.patient import PatientCreate, PatientRead
from app.repositories import patient_repository
from app.api.dependencies import get_current_user

router = APIRouter()

@router.post("/", response_model=PatientRead, status_code=status.HTTP_201_CREATED)
def register_new_patient(
    patient: PatientCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user) # The security lock!
):
    """
    Register a new patient. The patient is automatically linked to the logged-in clinician.
    """
    return patient_repository.create_patient(db, patient, physician_id=current_user.id)

@router.get("/", response_model=List[PatientRead])
def read_patients(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user) # The security lock!
):
    """
    Retrieve all patients assigned to the currently authenticated clinician.
    """
    return patient_repository.get_patients_by_physician(db, physician_id=current_user.id)