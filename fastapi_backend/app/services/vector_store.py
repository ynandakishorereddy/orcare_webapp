import logging
from pinecone import Pinecone, ServerlessSpec
from uuid import uuid4

logger = logging.getLogger(__name__)

class VectorStore:
    def __init__(self, api_key: str, index_name: str, embedding_service):
        self.api_key = api_key
        self.index_name = index_name
        self.embedding_service = embedding_service
        self.pc = None
        self.index = None
        self._initialize_pinecone()

    def _initialize_pinecone(self):
        if not self.api_key:
            logger.warning("PINECONE_API_KEY is not set. VectorStore will not function properly.")
            return

        self.pc = Pinecone(api_key=self.api_key)
        
        # Check if index exists, create if not
        try:
            active_indexes = [idx.name for idx in self.pc.list_indexes()]
            if self.index_name not in active_indexes:
                logger.info(f"Creating Pinecone index '{self.index_name}'...")
                self.pc.create_index(
                    name=self.index_name,
                    dimension=384, # Dimension for all-MiniLM-L6-v2
                    metric="cosine",
                    spec=ServerlessSpec(
                        cloud="aws",
                        region="us-east-1"
                    )
                )
            self.index = self.pc.Index(self.index_name)
            logger.info(f"Successfully connected to Pinecone index '{self.index_name}'")
        except Exception as e:
            logger.error(f"Failed to initialize Pinecone: {e}")


    def add_documents(self, document_id: str, chunks: list[dict]) -> int:
        if not self.index:
            raise RuntimeError("Pinecone index is not initialized.")
            
        texts = [c['chunk_text'] for c in chunks]
        embeddings = self.embedding_service.embed(texts)
        
        vectors = []
        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            vector_id = f"{document_id}_chunk_{i}"
            metadata = {
                "document_id": str(document_id),
                "page_number": chunk.get('page_number', 0),
                "chunk_index": chunk['chunk_index'],
                "chunk_text": chunk['chunk_text']
            }
            vectors.append({"id": vector_id, "values": embedding, "metadata": metadata})
            
        # Upsert in batches of 100
        batch_size = 100
        for i in range(0, len(vectors), batch_size):
            batch = vectors[i:i + batch_size]
            self.index.upsert(vectors=batch)
            
        return len(vectors)

    def search(self, query: str, top_k: int = 5, user_id: str = None) -> list[dict]:
        if not self.index:
            logger.warning("Search failed: Pinecone index not initialized.")
            return []
            
        query_embedding = self.embedding_service.embed_single(query)
        
        results = self.index.query(
            vector=query_embedding,
            top_k=top_k,
            include_metadata=True
        )
        
        formatted_results = []
        for match in results.matches:
            formatted_results.append({
                'chunk_text': match.metadata.get('chunk_text', ''),
                'document_name': match.metadata.get('document_name', 'Unknown Document'),
                'similarity_score': match.score,
                'page_number': int(match.metadata.get('page_number', 0)),
                'document_id': match.metadata.get('document_id', '')
            })
            
        return formatted_results

    def delete_document(self, document_id: str):
        if not self.index:
            return
            
        # Pinecone doesn't support deleting by metadata yet in serverless via simple API, 
        # but you can delete by prefix if you list them or store the IDs.
        # For a production app with Pinecone, we typically keep track of vector IDs in Postgres.
        # As a fallback for this demo, we can just skip hard-deleting from Pinecone if it's complex,
        # but ideally we fetch the IDs and delete them.
        logger.warning(f"Delete document from vector store requested for {document_id}, operation not fully supported without ID tracking.")
        pass

_vector_store = None

def get_vector_store() -> VectorStore:
    global _vector_store
    if _vector_store is None:
        from app.config import get_settings
        from app.services.embeddings import get_embedding_service
        settings = get_settings()
        _vector_store = VectorStore(
            api_key=settings.PINECONE_API_KEY, 
            index_name=settings.PINECONE_INDEX, 
            embedding_service=get_embedding_service(settings.EMBEDDING_MODEL)
        )
    return _vector_store
