"""
SQLite metadata store for document and chunk tracking.
Provides functions to initialize the database and perform CRUD operations.
"""

import sqlite3
from datetime import datetime, timezone
from typing import Optional

DB_PATH = "metadata.db"


def _get_connection() -> sqlite3.Connection:
    """Create and return a new SQLite connection with row factory."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db() -> None:
    """
    Initialize the SQLite database.
    Creates the documents and chunks tables if they do not exist.
    """
    conn = _get_connection()
    try:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS documents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                filename TEXT NOT NULL,
                original_name TEXT NOT NULL,
                num_chunks INTEGER NOT NULL DEFAULT 0,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS chunks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                document_id INTEGER NOT NULL,
                chunk_text TEXT NOT NULL,
                chunk_index INTEGER NOT NULL,
                page_number INTEGER,
                FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
            CREATE INDEX IF NOT EXISTS idx_chunks_document_id ON chunks(document_id);
            """
        )
        conn.commit()
    finally:
        conn.close()


def save_document(
    user_id: str, filename: str, original_name: str, num_chunks: int
) -> int:
    """
    Save a document record to the database.

    Args:
        user_id: The ID of the user who uploaded the document.
        filename: The stored filename (UUID-based).
        original_name: The original filename from the upload.
        num_chunks: The number of text chunks extracted.

    Returns:
        The auto-generated document ID.
    """
    conn = _get_connection()
    try:
        cursor = conn.execute(
            """
            INSERT INTO documents (user_id, filename, original_name, num_chunks, created_at)
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                user_id,
                filename,
                original_name,
                num_chunks,
                datetime.now(timezone.utc).isoformat(),
            ),
        )
        conn.commit()
        return cursor.lastrowid
    finally:
        conn.close()


def get_documents(user_id: str) -> list[dict]:
    """
    Retrieve all documents for a given user.

    Args:
        user_id: The ID of the user.

    Returns:
        A list of document dicts with keys: id, filename, original_name, num_chunks, created_at.
    """
    conn = _get_connection()
    try:
        cursor = conn.execute(
            "SELECT id, filename, original_name, num_chunks, created_at FROM documents WHERE user_id = ? ORDER BY created_at DESC",
            (user_id,),
        )
        return [dict(row) for row in cursor.fetchall()]
    finally:
        conn.close()


def delete_document(document_id: int) -> bool:
    """
    Delete a document and its associated chunks from the database.

    Args:
        document_id: The ID of the document to delete.

    Returns:
        True if the document was found and deleted, False otherwise.
    """
    conn = _get_connection()
    try:
        # Chunks are deleted via ON DELETE CASCADE
        cursor = conn.execute(
            "DELETE FROM documents WHERE id = ?", (document_id,)
        )
        conn.commit()
        return cursor.rowcount > 0
    finally:
        conn.close()


def save_chunks(document_id: int, chunks_list: list[dict]) -> None:
    """
    Save text chunks associated with a document.

    Args:
        document_id: The ID of the parent document.
        chunks_list: A list of dicts with keys: chunk_text, chunk_index, page_number (optional).
    """
    conn = _get_connection()
    try:
        conn.executemany(
            """
            INSERT INTO chunks (document_id, chunk_text, chunk_index, page_number)
            VALUES (?, ?, ?, ?)
            """,
            [
                (
                    document_id,
                    chunk["chunk_text"],
                    chunk["chunk_index"],
                    chunk.get("page_number"),
                )
                for chunk in chunks_list
            ],
        )
        conn.commit()
    finally:
        conn.close()
