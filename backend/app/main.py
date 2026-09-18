from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.core.logging import configure_logging
from app.database.init_db import init_db

from app.database.session import engine
from app.database import models
from app.api.routers import copilot


models.Base.metadata.create_all(bind=engine)



@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    if settings.app_env in {"development", "test"}:
        init_db()
    yield


def create_app() -> FastAPI:
    configure_logging()

    app = FastAPI(
        title=settings.app_name,
        version="0.1.0",
        description="Clinical intelligence and decision support API for MedIntel AI.",
        openapi_url=f"{settings.api_v1_prefix}/openapi.json",
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.backend_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router, prefix=settings.api_v1_prefix)
    
    # ---------------------------------------------------------
    # NEW: Register the Copilot router with the /api/v1 prefix
    # ---------------------------------------------------------
    app.include_router(
        copilot.router, 
        prefix=f"{settings.api_v1_prefix}/copilot", 
        tags=["Copilot"]
    )
    
    return app


app = create_app()