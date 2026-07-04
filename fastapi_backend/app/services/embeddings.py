"""
Embedding service for ORCare RAG pipeline.

Uses sentence-transformers to generate dense vector embeddings for text
chunks and search queries.  The model is lazily loaded on first use to
keep application startup fast.
"""

import logging

from sentence_transformers import SentenceTransformer

logger = logging.getLogger(__name__)


class EmbeddingService:
    """Thin wrapper around a SentenceTransformer model with lazy loading."""

    def __init__(self, model_name: str = "all-MiniLM-L6-v2") -> None:
        self.model_name = model_name
        self._model: SentenceTransformer | None = None

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    def _load_model(self) -> None:
        """Download / load the SentenceTransformer model on first use."""
        if self._model is None:
            logger.info("Loading embedding model: %s", self.model_name)
            self._model = SentenceTransformer(self.model_name)
            logger.info("Embedding model loaded successfully")

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def embed(self, texts: list[str]) -> list[list[float]]:
        """
        Generate embeddings for a batch of texts.

        Args:
            texts: List of strings to embed.

        Returns:
            A list of embedding vectors (each a list of floats).
        """
        self._load_model()
        assert self._model is not None  # for type-checkers
        logger.debug("Generating embeddings for %d texts", len(texts))
        embeddings = self._model.encode(texts)
        return embeddings.tolist()

    def embed_single(self, text: str) -> list[float]:
        """
        Generate an embedding for a single text string.

        Args:
            text: The text to embed.

        Returns:
            An embedding vector as a list of floats.
        """
        return self.embed([text])[0]


# ----------------------------------------------------------------------
# Module-level singleton
# ----------------------------------------------------------------------

_embedding_service: EmbeddingService | None = None


def get_embedding_service(
    model_name: str = "all-MiniLM-L6-v2",
) -> EmbeddingService:
    """
    Return the module-level :class:`EmbeddingService` singleton.

    The instance is created on the first call and reused thereafter.
    """
    global _embedding_service
    if _embedding_service is None:
        _embedding_service = EmbeddingService(model_name)
    return _embedding_service
