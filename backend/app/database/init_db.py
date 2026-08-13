import logging
from app.database.session import engine
from app.database.base import Base
from app.database.models import User  # Add this line so SQLAlchemy sees the model!

logger = logging.getLogger(__name__)

def init_db() -> None:
    """
    Creates all database tables based on the SQLAlchemy Base metadata.
    """
    logger.info("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created successfully.")