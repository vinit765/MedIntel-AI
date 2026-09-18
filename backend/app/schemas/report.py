from pydantic import BaseModel
from datetime import datetime
from typing import Optional

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
    
    # ADDED: This allows FastAPI to send the saved AI analysis to the Next.js frontend!
    ai_analysis: Optional[str] = None

    class Config:
        from_attributes = True