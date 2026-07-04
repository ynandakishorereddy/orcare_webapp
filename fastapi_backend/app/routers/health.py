"""
Health check router for the ORCare RAG API.
Reports the status of the API and its dependent services.
"""

from pathlib import Path

from fastapi import APIRouter

from app.config import get_settings
from app.models import HealthResponse

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("/", response_model=HealthResponse)
async def health_check():
    """
    Perform a health check on the API and its services.
    Returns the overall status and individual service availability.
    """
    settings = get_settings()

    services = {}
    
    # Check metadata db
    if Path("metadata.db").exists():
        services["metadata_db"] = "available"
    else:
        services["metadata_db"] = "unavailable"

    overall_status = "ok" if all(v == "available" for v in services.values()) else "degraded"

    return HealthResponse(
        status=overall_status,
        version="1.0.0",
        services=services,
    )
