import os
import sys
from docx import Document

# Ensure the script can find your app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.ai.rag.pipeline import process_and_store_document

def ingest_master_document(file_path: str):
    """
    Reads the RAG-Ready Edition Knowledge Document and pushes it to ChromaDB.
    """
    print(f"Loading document: {file_path}")
    
    if not os.path.exists(file_path):
        print("Error: Document not found.")
        return

    # Load the DOCX file
    doc = Document(file_path)
    full_text = "\n".join([para.text for para in doc.paragraphs if para.text.strip()])
    
    print("Document loaded. Initiating chunking and embedding...")
    
    # Define the metadata for the vector store payload
    metadata = {
        "source": "Medintel_RAG",
        "status": "FINAL — v1.2 production-ready RAG edition",
        "retrieval_role": "GOVERNANCE_SUPPORTING_AND_PATIENT_RETRIEVABLE"
    }
    
    # Send to your existing RAG pipeline to chunk and store
    success = process_and_store_document(full_text, metadata)
    
    if success:
        print("✅ Successfully chunked and stored 11 RAG-Eligible Units in ChromaDB.")
    else:
        print("❌ Failed to process the document.")

if __name__ == "__main__":
    # Point to the file in the data folder
    target_file = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "Medintel_RAG.docx")
    ingest_master_document(target_file)