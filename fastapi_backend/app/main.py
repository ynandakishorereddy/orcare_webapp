"""
FastAPI application entry point for the ORCare RAG API.
Configures CORS, includes routers, and handles startup initialization.
"""

import logging
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.database import init_db
from app.routers import documents, health, search

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="ORCare RAG API",
    description="Retrieval-Augmented Generation API for ORCare dental practice management. "
    "Upload PDF documents, perform semantic search, and ask questions with AI-powered answers.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# --- CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Include Routers ---
app.include_router(health.router, prefix="/api/v1")
app.include_router(documents.router, prefix="/api/v1")
app.include_router(search.router, prefix="/api/v1")


# --- Startup Event ---
@app.on_event("startup")
async def startup_event():
    """Initialize database and ensure required directories exist on startup."""
    settings = get_settings()

    # Initialize SQLite database
    logger.info("Initializing database...")
    init_db()

    # Ensure upload directory exists
    upload_path = Path(settings.UPLOAD_DIR)
    upload_path.mkdir(parents=True, exist_ok=True)
    logger.info("Upload directory ready: %s", upload_path.resolve())

    logger.info("ORCare RAG API startup complete.")


# --- Root Endpoint ---
@app.get("/", tags=["Root"])
async def root():
    """Root endpoint returning API info."""
    return {
        "message": "ORCare RAG API",
        "docs": "/docs",
    }
