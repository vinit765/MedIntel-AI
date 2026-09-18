from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Date, Text
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime, timezone

# 1. Define the Base
Base = declarative_base()

# 2. The User (Clinician) Table
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="CLINICIAN")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationships
    patients = relationship("Patient", back_populates="physician")
    authored_records = relationship("ClinicalRecord", back_populates="author")

# 3. The Patient Table
class Patient(Base):
    __tablename__ = "patients"
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    date_of_birth = Column(Date)
    gender = Column(String)
    blood_type = Column(String, nullable=True)
    contact_number = Column(String, nullable=True)
    
    physician_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationships
    physician = relationship("User", back_populates="patients")
    records = relationship("ClinicalRecord", back_populates="patient", cascade="all, delete-orphan")

# 4. The Clinical Record Table
class ClinicalRecord(Base):
    __tablename__ = "clinical_records"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    author_id = Column(Integer, ForeignKey("users.id"))
    
    record_type = Column(String)
    content = Column(Text)       
    is_flagged = Column(Boolean, default=False) 
    ai_analysis = Column(Text, nullable=True) # <-- NEW COLUMN ADDED HERE
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    # Relationships
    patient = relationship("Patient", back_populates="records")
    author = relationship("User", back_populates="authored_records")