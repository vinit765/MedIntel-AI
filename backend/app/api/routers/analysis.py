from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.database.models import User
from app.repositories import report_repository
from app.api.dependencies import get_current_user
from app.ai.rag.pipeline import analyze_clinical_text

router = APIRouter()

@router.post("/{report_id}/analyze", response_model=dict)
def run_ai_analysis(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Runs a specific clinical report through the RAG + Llama 3 pipeline.
    """
    # 1. Fetch the report from the database
    report = report_repository.get_report_by_id(db, report_id, current_user.id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    # 2. Run the AI Service
    try:
        ai_result = analyze_clinical_text(report.content)
        
        # 3. Determine if the AI flagged risks (simple keyword check for demonstration)
        raw_text = ai_result["raw_response"].lower()
        is_flagged = "high-risk" in raw_text or "anomaly" in raw_text or "abnormal" in raw_text
        
        # 4. Update the database flag so the frontend Dashboard knows it needs attention
        if is_flagged != report.is_flagged:
            report.is_flagged = is_flagged
            db.commit()
            
        return ai_result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))