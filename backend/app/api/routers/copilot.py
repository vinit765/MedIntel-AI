from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

# Adjust these imports to match your project structure
from app.database.session import get_db
from app.api.dependencies import get_current_user
from app.database.models import User, Patient
from app.ai.rag.pipeline import chat_with_copilot

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    patient_id: Optional[int] = None

@router.post("/chat")
def copilot_chat_endpoint(
    request: ChatRequest, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    patient_context = ""
    
    # If the doctor has an active patient selected, fetch their data and records
    if request.patient_id:
        patient = db.query(Patient).filter(
            Patient.id == request.patient_id,
            Patient.physician_id == current_user.id
        ).first()
        
        if patient:
            # Build a string of the patient's vitals and last 3 clinical records
            patient_context = f"Patient: {patient.first_name} {patient.last_name}, DOB: {patient.date_of_birth}, Gender: {patient.gender}, Blood Type: {patient.blood_type}.\n"
            patient_context += "Recent Clinical Records:\n"
            
            # Since you established the relationship in models.py, we can access records directly
            for record in patient.records[-3:]: 
                patient_context += f"- [{record.record_type}] (Flagged: {record.is_flagged}): {record.content}\n"
    
    # Pass the message and the live database context to Llama 3
    ai_reply = chat_with_copilot(request.message, patient_context)
    
    return {"reply": ai_reply}