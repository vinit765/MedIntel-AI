from sqlalchemy.orm import Session
from app.database.models import Patient
from app.schemas.patient import PatientCreate

def create_patient(db: Session, patient_in: PatientCreate, physician_id: int) -> Patient:
    """Creates a new patient in the database linked to a specific doctor."""
    db_patient = Patient(
        first_name=patient_in.first_name,
        last_name=patient_in.last_name,
        date_of_birth=patient_in.date_of_birth,
        gender=patient_in.gender,
        blood_type=patient_in.blood_type,
        contact_number=patient_in.contact_number,
        physician_id=physician_id
    )
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

def get_patients_by_physician(db: Session, physician_id: int) -> list[Patient]:
    """Retrieves all patients registered to a specific doctor."""
    return db.query(Patient).filter(Patient.physician_id == physician_id).all()