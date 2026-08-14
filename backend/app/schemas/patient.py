from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional

# Base properties shared across all patient schemas
class PatientBase(BaseModel):
    first_name: str = Field(..., example="John")
    last_name: str = Field(..., example="Doe")
    date_of_birth: date
    gender: str = Field(..., example="Male")
    blood_type: Optional[str] = None
    contact_number: Optional[str] = None

# Schema for when the frontend creates a new patient
class PatientCreate(PatientBase):
    pass

# Schema for when the backend sends patient data to the frontend
class PatientRead(PatientBase):
    id: int
    physician_id: int
    created_at: datetime

    class Config:
        from_attributes = True