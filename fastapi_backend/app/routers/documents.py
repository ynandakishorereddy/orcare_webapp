"""
Document management router for the ORCare RAG API.
Handles PDF upload, listing, and deletion with vector store integration.
"""

import logging
import uuid
from datetime import datetime, timezone
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status

from app.auth import get_current_user
from app.config import get_settings
from app.database import delete_document, get_documents, save_chunks, save_document
from app.models import (
    DocumentInfo,
    DocumentListResponse,
    DocumentUploadResponse,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/documents", tags=["Documents"])


@router.post("/upload", response_model=DocumentUploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_document(
    file: UploadFile,
    user: dict = Depends(get_current_user),
):
    """
    Upload a PDF document for processing.
    Extracts text, chunks it, stores embeddings in the vector store,
    and saves metadata to the database.
    """
    settings = get_settings()

    # Validate file type
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Only PDF files are accepted. Received: {file.content_type}",
        )

    # Read file content and validate size
    content = await file.read()
    max_size_bytes = settings.MAX_FILE_SIZE_MB * 1024 * 1024
    if len(content) > max_size_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size exceeds maximum of {settings.MAX_FILE_SIZE_MB} MB",
        )

    # Save file to disk with UUID filename
    file_ext = Path(file.filename).suffix if file.filename else ".pdf"
    stored_filename = f"{uuid.uuid4().hex}{file_ext}"
    file_path = Path(settings.UPLOAD_DIR) / stored_filename

    try:
        file_path.write_bytes(content)
        logger.info("Saved uploaded file: %s -> %s", file.filename, file_path)
    except OSError as e:
        logger.error("Failed to save file: %s", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save uploaded file",
        )

    # Extract text and chunk it
    try:
        from app.services.pdf_extractor import chunk_text, extract_text_from_pdf

        pages = extract_text_from_pdf(str(file_path))
        chunks = chunk_text(
            pages,
            chunk_size=settings.CHUNK_SIZE,
            chunk_overlap=settings.CHUNK_OVERLAP,
        )
        logger.info("Extracted %d chunks from %s", len(chunks), file.filename)
    except Exception as e:
        # Clean up the saved file on extraction failure
        file_path.unlink(missing_ok=True)
        logger.error("PDF extraction failed: %s", e)
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Failed to extract text from PDF: {str(e)}",
        )

    # Store embeddings in vector store
    try:
        from app.services.vector_store import get_vector_store

        vector_store = get_vector_store()
        vector_store.add_documents(
            chunks=chunks,
            document_name=file.filename or stored_filename,
            user_id=user["userId"],
        )
        logger.info("Added %d chunks to vector store", len(chunks))
    except Exception as e:
        file_path.unlink(missing_ok=True)
        logger.error("Vector store insertion failed: %s", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to store document embeddings: {str(e)}",
        )

    # Save metadata to database
    try:
        document_id = save_document(
            user_id=user["userId"],
            filename=stored_filename,
            original_name=file.filename or stored_filename,
            num_chunks=len(chunks),
        )

        # Prepare chunks for database storage
        chunks_for_db = [
            {
                "chunk_text": chunk["chunk_text"],
                "chunk_index": chunk.get("chunk_index", i),
                "page_number": chunk.get("page_number"),
            }
            for i, chunk in enumerate(chunks)
        ]
        save_chunks(document_id, chunks_for_db)

        logger.info("Document metadata saved with ID: %d", document_id)
    except Exception as e:
        file_path.unlink(missing_ok=True)
        logger.error("Database save failed: %s", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to save document metadata: {str(e)}",
        )

    return DocumentUploadResponse(
        id=str(document_id),
        filename=file.filename or stored_filename,
        num_chunks=len(chunks),
        created_at=datetime.now(timezone.utc).isoformat(),
    )


@router.get("/", response_model=DocumentListResponse)
async def list_documents(user: dict = Depends(get_current_user)):
    """List all documents uploaded by the authenticated user."""
    docs = get_documents(user["userId"])

    return DocumentListResponse(
        documents=[
            DocumentInfo(
                id=str(doc["id"]),
                filename=doc["filename"],
                original_name=doc["original_name"],
                num_chunks=doc["num_chunks"],
                created_at=doc["created_at"],
            )
            for doc in docs
        ]
    )


@router.delete("/{document_id}", status_code=status.HTTP_200_OK)
async def remove_document(
    document_id: int,
    user: dict = Depends(get_current_user),
):
    """
    Delete a document by ID.
    Removes metadata from the database and embeddings from the vector store.
    """
    # Delete from vector store
    try:
        from app.services.vector_store import get_vector_store

        vector_store = get_vector_store()
        vector_store.delete_document(document_id)
    except Exception as e:
        logger.warning("Vector store deletion failed (continuing): %s", e)

    # Delete from database
    deleted = delete_document(document_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Document with ID {document_id} not found",
        )

    return {"message": f"Document {document_id} deleted successfully"}
