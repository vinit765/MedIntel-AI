from app.database.base import Base
from app.database.session import engine
from app.models import user


def init_db() -> None:
    _ = user
    Base.metadata.create_all(bind=engine)
