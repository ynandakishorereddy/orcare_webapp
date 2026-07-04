"""
Search and RAG router for the ORCare RAG API.
Provides semantic search and RAG-powered question answering endpoints.
"""

import logging

from fastapi import APIRouter, Depends, HTTPException, status

from app.auth import get_current_user
from app.models import (
    RAGRequest,
    RAGResponse,
    SearchRequest,
    SearchResponse,
    SearchResult,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="", tags=["Search"])


@router.post("/search", response_model=SearchResponse)
async def search_documents(
    body: SearchRequest,
    user: dict = Depends(get_current_user),
):
    """
    Perform semantic search across the user's uploaded documents.
    Returns the most similar chunks ranked by similarity score.
    """
    try:
        from app.services.vector_store import get_vector_store

        vector_store = get_vector_store()
        raw_results = vector_store.search(body.query, body.top_k)

        results = [
            SearchResult(
                chunk_text=r["chunk_text"],
                document_name=r["document_name"],
                similarity_score=r["similarity_score"],
                page_number=r.get("page_number"),
            )
            for r in raw_results
        ]

        return SearchResponse(results=results, query=body.query)

    except Exception as e:
        logger.error("Search failed: %s", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Search failed: {str(e)}",
        )


@router.post("/rag/ask", response_model=RAGResponse)
async def rag_ask(
    body: RAGRequest,
    user: dict = Depends(get_current_user),
):
    """
    Ask a question using Retrieval-Augmented Generation.
    Retrieves relevant document chunks and generates an AI-powered answer.
    """
    try:
        from app.services.rag_engine import get_rag_engine

        rag_engine = get_rag_engine()
        result = rag_engine.answer(
            question=body.question,
            top_k=body.top_k,
            user_id=user["userId"],
        )

        sources = [
            SearchResult(
                chunk_text=s["chunk_text"],
                document_name=s["document_name"],
                similarity_score=s["similarity_score"],
                page_number=s.get("page_number"),
            )
            for s in result["sources"]
        ]

        return RAGResponse(
            answer=result["answer"],
            sources=sources,
            question=body.question,
        )

    except Exception as e:
        logger.error("RAG query failed: %s", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"RAG query failed: {str(e)}",
        )
