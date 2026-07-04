import logging
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage, SystemMessage

from app.services.vector_store import VectorStore

logger = logging.getLogger(__name__)

_SYSTEM_PROMPT = (
    "You are ORCare AI, a dental health expert. You have access to a tool "
    "that searches a database of dental documents. ALWAYS use this tool first "
    "to find context to answer the user's question. If the documents don't "
    "contain the answer, you can use your general knowledge, but state clearly "
    "that the answer is not from the uploaded documents. When you use the documents, "
    "cite the document name and page number."
)

class RAGEngine:
    """Agentic RAG Engine using LangGraph."""
    
    def __init__(self, api_key: str, vector_store: VectorStore):
        self.api_key = api_key
        self.vector_store = vector_store
        
        # Initialize LangChain LLM
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            google_api_key=api_key
        )
        
        # Define the tool
        @tool
        def retrieve_documents(query: str) -> list[dict]:
            """Searches the vector database for dental documents matching the query."""
            return self.vector_store.search(query, top_k=5)
            
        self.tools = [retrieve_documents]
        
        # Create LangGraph agent
        self.agent = create_react_agent(self.llm, self.tools, state_modifier=_SYSTEM_PROMPT)
        
        logger.info("LangGraph Agent initialized with Gemini 1.5 Flash")
        
    def answer(self, question: str, top_k: int = 5, user_id: str = None) -> dict:
        try:
            # Execute the graph
            messages = [{"role": "user", "content": question}]
            result = self.agent.invoke({"messages": messages})
            
            # Extract the final answer
            answer_text = result["messages"][-1].content
            
            # Fetch sources manually for UI structured data (Agent citations are in the text)
            sources = self.vector_store.search(question, top_k=top_k, user_id=user_id)
            
            return {
                "answer": answer_text,
                "sources": sources,
                "question": question
            }
        except Exception as e:
            logger.exception("Agent generation failed")
            return {
                "answer": "I encountered an error generating a response.",
                "sources": [],
                "question": question
            }

_rag_engine = None

def get_rag_engine() -> RAGEngine:
    global _rag_engine
    if _rag_engine is None:
        from app.config import get_settings
        from app.services.vector_store import get_vector_store
        settings = get_settings()
        _rag_engine = RAGEngine(settings.GEMINI_API_KEY, get_vector_store())
    return _rag_engine
