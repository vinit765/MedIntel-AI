import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# We use a local SQLite file for development. 
# You can change this in your .env file later (e.g., DATABASE_URL=postgresql://user:password@localhost/dbname)
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./medintel.db")

# connect_args={"check_same_thread": False} is only needed for SQLite in FastAPI
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency to get the database session in our API routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()