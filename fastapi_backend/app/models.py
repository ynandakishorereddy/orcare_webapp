"""
Pydantic models for request/response schemas across the ORCare RAG API.
"""

from pydantic import BaseModel, Field


# --- Document Models ---


class DocumentUploadResponse(BaseModel):
    """Response returned after a successful document upload."""

    id: str
    filename: str
    num_chunks: int
    created_at: str


class DocumentInfo(BaseModel):
    """Information about a stored document."""

    id: str
    filename: str
    original_name: str
    num_chunks: int
    created_at: str


class DocumentListResponse(BaseModel):
    """Response containing a list of user documents."""

    documents: list[DocumentInfo]


# --- Search Models ---


class SearchRequest(BaseModel):
    """Request body for vector similarity search."""

    query: str
    top_k: int = Field(default=5, ge=1, le=20)


class SearchResult(BaseModel):
    """A single search result with chunk text and metadata."""

    chunk_text: str
    document_name: str
    similarity_score: float
    page_number: int | None = None


class SearchResponse(BaseModel):
    """Response containing search results."""

    results: list[SearchResult]
    query: str


# --- RAG Models ---


class RAGRequest(BaseModel):
    """Request body for RAG question answering."""

    question: str
    top_k: int = Field(default=5, ge=1, le=20)


class RAGResponse(BaseModel):
    """Response from the RAG engine with answer and sources."""

    answer: str
    sources: list[SearchResult]
    question: str


# --- Health Models ---


class HealthResponse(BaseModel):
    """Health check response with service status."""

    status: str
    version: str
    services: dict
