from pydantic import BaseModel

class AnalysisResponse(BaseModel):
    raw_response: str
    context_used: str