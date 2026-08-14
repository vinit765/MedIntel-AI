from pydantic import BaseModel
from datetime import datetime

# The data required from the frontend to save a report
class ReportCreate(BaseModel):
    patient_id: int
    record_type: str
    content: str  # This will hold the raw text of the medical document

# The data returned to the frontend after saving
class ReportRead(BaseModel):
    id: int
    patient_id: int
    author_id: int
    record_type: str
    content: str
    is_flagged: bool
    created_at: datetime

    class Config:
        from_attributes = True