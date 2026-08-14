from sqlalchemy.orm import Session
from app.database.models import ClinicalRecord
from app.schemas.report import ReportCreate

def create_report(db: Session, report_in: ReportCreate, author_id: int) -> ClinicalRecord:
    """Saves a new clinical record to the database."""
    db_report = ClinicalRecord(
        patient_id=report_in.patient_id,
        author_id=author_id,
        record_type=report_in.record_type,
        content=report_in.content
    )
    
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    
    return db_report

def get_reports_by_author(db: Session, author_id: int) -> list[ClinicalRecord]:
    """Retrieves all clinical records uploaded by a specific clinician, newest first."""
    return db.query(ClinicalRecord).filter(
        ClinicalRecord.author_id == author_id
    ).order_by(ClinicalRecord.created_at.desc()).all()

def get_report_by_id(db: Session, report_id: int, author_id: int) -> ClinicalRecord:
    """Retrieves a single clinical record by ID, verifying ownership."""
    return db.query(ClinicalRecord).filter(
        ClinicalRecord.id == report_id,
        ClinicalRecord.author_id == author_id
    ).first()