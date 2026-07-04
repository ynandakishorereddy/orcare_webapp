"""
PDF text extraction and chunking service for ORCare RAG pipeline.
"""

import logging
from pathlib import Path

import fitz  # PyMuPDF

logger = logging.getLogger(__name__)


def extract_text_from_pdf(file_path: str) -> list[dict]:
    """
    Extract text content from each page of a PDF file.

    Args:
        file_path: Absolute or relative path to the PDF file.

    Returns:
        A list of dicts, each containing:
            - page_number (int): 1-based page index.
            - text (str): Extracted text for that page.
    """
    path = Path(file_path)
    if not path.exists():
        logger.error("PDF file not found: %s", file_path)
        raise FileNotFoundError(f"PDF file not found: {file_path}")

    pages: list[dict] = []
    try:
        doc = fitz.open(file_path)
        for page_index in range(len(doc)):
            page = doc[page_index]
            text = page.get_text()
            pages.append({
                "page_number": page_index + 1,
                "text": text,
            })
        doc.close()
        logger.info(
            "Extracted text from %d pages of %s", len(pages), file_path
        )
    except Exception:
        logger.exception("Failed to extract text from PDF: %s", file_path)
        raise

    return pages


def chunk_text(
    pages: list[dict],
    chunk_size: int = 500,
    chunk_overlap: int = 50,
) -> list[dict]:
    """
    Split extracted page texts into overlapping chunks suitable for embedding.

    The function concatenates all page texts, builds a character-to-page
    mapping, then splits the combined text into chunks of approximately
    *chunk_size* characters with *chunk_overlap* characters of overlap.
    Split points are chosen at sentence boundaries (``'. '`` or ``'\\n'``)
    whenever possible.

    Args:
        pages: Output of :func:`extract_text_from_pdf`.
        chunk_size: Target number of characters per chunk.
        chunk_overlap: Number of overlapping characters between consecutive
            chunks.

    Returns:
        A list of dicts, each containing:
            - chunk_text (str): The text of the chunk.
            - chunk_index (int): 0-based index of the chunk.
            - page_number (int): The 1-based page that the chunk starts on.
            - start_char (int): Start character offset in the full text.
            - end_char (int): End character offset (exclusive) in the full text.
    """
    if not pages:
        return []

    # --- Build concatenated text and char → page mapping ----------------
    full_text = ""
    char_to_page: list[int] = []

    for page in pages:
        page_text = page["text"]
        page_number = page["page_number"]
        char_to_page.extend([page_number] * len(page_text))
        full_text += page_text

    if not full_text.strip():
        logger.warning("No text content found in pages")
        return []

    total_length = len(full_text)
    chunks: list[dict] = []
    chunk_index = 0
    start = 0

    while start < total_length:
        end = min(start + chunk_size, total_length)

        # If we haven't reached the end of the document, try to break at a
        # sentence boundary so chunks are more semantically coherent.
        if end < total_length:
            # Look backwards from *end* for the nearest sentence boundary.
            search_region = full_text[start:end]
            last_period = search_region.rfind(". ")
            last_newline = search_region.rfind("\n")
            best_break = max(last_period, last_newline)

            # Only use the boundary if it's in the second half of the chunk
            # to avoid very short chunks.
            min_break_pos = chunk_size // 2
            if best_break >= min_break_pos:
                # +1 to include the boundary character ('.' or '\n') in the
                # current chunk; for '. ' the space will start the next chunk.
                end = start + best_break + 1

        chunk_text_value = full_text[start:end].strip()
        if chunk_text_value:
            page_number = char_to_page[start] if start < len(char_to_page) else pages[-1]["page_number"]
            chunks.append({
                "chunk_text": chunk_text_value,
                "chunk_index": chunk_index,
                "page_number": page_number,
                "start_char": start,
                "end_char": end,
            })
            chunk_index += 1

        # Advance with overlap
        start = end - chunk_overlap if end < total_length else total_length

    logger.info(
        "Created %d chunks from %d characters of text", len(chunks), total_length
    )
    return chunks
