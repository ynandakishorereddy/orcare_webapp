"""
Application configuration using pydantic-settings.
Loads settings from environment variables and .env file.
"""

import functools
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    GEMINI_API_KEY: str = ""
    JWT_SECRET: str = "supersecret"
    PINECONE_API_KEY: str = ""
    PINECONE_INDEX: str = "orcare-dental-docs"
    UPLOAD_DIR: str = "./uploads"
    EMBEDDING_MODEL: str = "all-MiniLM-L6-v2"
    MAX_FILE_SIZE_MB: int = 10
    CHUNK_SIZE: int = 500
    CHUNK_OVERLAP: int = 50

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "extra": "ignore",
    }


@functools.lru_cache()
def get_settings() -> Settings:
    """Return cached application settings singleton."""
    return Settings()
