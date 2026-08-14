import io
import pdfplumber
from fastapi import APIRouter, Depends, status, UploadFile, File, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.database.models import User
from app.schemas.report import ReportCreate, ReportRead
from app.repositories import report_repository
from app.api.dependencies import get_current_user

router = APIRouter()

@router.post("/", response_model=ReportRead, status_code=status.HTTP_201_CREATED)
def upload_clinical_report(
    report: ReportCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Upload a new clinical report manually.
    """
    return report_repository.create_report(db, report, author_id=current_user.id)


@router.post("/extract-text")
async def extract_text_from_file(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """
    Accepts a digital PDF file, extracts the text using pure Python, and returns it.
    """
    try:
        filename = file.filename.lower()
        
        # Enforce PDF only to avoid needing external OCR software
        if not filename.endswith(".pdf"):
            raise HTTPException(
                status_code=400, 
                detail="For security and processing reasons, only PDF documents are supported at this time."
            )

        # Read the file directly into memory
        contents = await file.read()
        extracted_text = ""

        # Extract text using pdfplumber (Pure Python)
        with pdfplumber.open(io.BytesIO(contents)) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    extracted_text += text + "\n"
        
        # Fallback if the PDF is actually just a scanned image inside a PDF wrapper
        if not extracted_text.strip():
            return {"extracted_text": "[Extraction Failed] This PDF appears to be a scanned image. Please upload a digital text PDF or manually type the notes."}

        return {"extracted_text": extracted_text.strip()}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")