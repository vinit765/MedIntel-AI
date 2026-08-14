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