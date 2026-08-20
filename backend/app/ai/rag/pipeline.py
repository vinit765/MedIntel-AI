import os
import uuid
from typing import Dict, Any

from langchain_community.llms import Ollama
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Initialize the LLM
llm = Ollama(model="llama3", temperature=0.1)

# Initialize the embedding model
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# ChromaDB persistence directory
DB_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "chroma_db")

vector_store = Chroma(
    collection_name="medintel_clinical_evidence",
    embedding_function=embeddings,
    persist_directory=DB_DIR
)

def process_and_store_document(text: str, metadata: dict) -> bool:
    """
    Takes unstructured clinical text, chunks it, embeds it, 
    and stores it in the local ChromaDB vector store.
    """
    if not text or not text.strip():
        return False
        
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
        separators=["\n\n", "\n", ".", " "]
    )
    
    chunks = text_splitter.split_text(text)
    metadatas = [metadata for _ in chunks]
    ids = [str(uuid.uuid4()) for _ in chunks]
    
    vector_store.add_texts(texts=chunks, metadatas=metadatas, ids=ids)
    return True

def analyze_clinical_text(report_text: str) -> Dict[str, Any]:
    """
    Performs Retrieval-Augmented Generation (RAG).
    Retrieves relevant clinical units and prompts Llama 3 for structured point-by-point output.
    """
    # 1. Retrieval
    retrieved_docs = vector_store.similarity_search(report_text, k=8)
    context = "\n\n".join([doc.page_content for doc in retrieved_docs])
    
    # 2. Structured Point-Based Prompt
    prompt = f"""
    You are an expert clinical AI assistant. Analyze the patient report using the provided Clinical Evidence Context.
    
    CRITICAL FORMATTING INSTRUCTIONS:
    - DO NOT output long paragraphs or essays.
    - Output ONLY clean, concise bullet points starting with a hyphen (- ).
    - DO NOT use bolding or asterisks (no **).
    - DO NOT include conversational filler (e.g., "Here is the output", "In summary").
    - Provide the output strictly using the three headers below.
    
    CLINICAL EVIDENCE CONTEXT:
    {context if context else "No specific guidelines found in database."}
    
    PATIENT REPORT:
    {report_text}
    
    Provide your output strictly in this exact format:
    EXECUTIVE SUMMARY:
    - (Point 1: Patient demographic and primary presentation)
    - (Point 2: Key vital and laboratory observations)
    - (Point 3: Overall clinical recommendation or next step)

    RISK ANALYSIS:
    - (Point 1: Blood pressure evaluation and out-of-office confirmation requirement)
    - (Point 2: Glycaemic findings and diabetes threshold comparison)
    - (Point 3: Haemoglobin status and anaemia classification)
    - (Point 4: Renal function findings and chronicity assessment)

    EVIDENCE REFERENCES:
    - (Point 1: Specific guideline name and recommendation locator used)
    - (Point 2: Next relevant guideline cited)
    - (Point 3: Additional authority cited)
    """
    
    # 3. Generation
    try:
        response = llm.invoke(prompt)
    except Exception as e:
        print(f"Ollama Connection Error: {e}")
        response = "EXECUTIVE SUMMARY:\n- AI Analysis Failed. Ensure Ollama is running.\nRISK ANALYSIS:\n- Analysis Pending\nEVIDENCE REFERENCES:\n- None"
    
    return {
        "raw_response": response,
        "context_used": context
    }