# ORCare RAG System — Specification
## Overview
The RAG system allows users to upload dental health PDF documents and receive AI-generated answers grounded in the uploaded content.

## Requirements
- REQ-001: Users can upload PDF documents (max 10MB)
- REQ-002: System extracts text and creates vector embeddings
- REQ-003: Users can perform semantic search across uploaded documents
- REQ-004: Users can ask questions and receive AI answers grounded in document content
- REQ-005: Answers include source citations (document name, page number)

## Test Cases
| ID | Question | Expected Keywords | Pass Criteria |
|---|---|---|---|
| TC-001 | What causes gum disease? | plaque, bacteria, inflammation | At least 2 keywords present |
| TC-002 | How do cavities form? | acid, enamel, bacteria | At least 2 keywords present |
| TC-003 | What is a root canal? | pulp, infected, nerve | At least 2 keywords present |
| TC-004 | How should I brush my teeth? | 45-degree, fluoride, two minutes | At least 2 keywords present |
| TC-005 | When should I see a dentist? | pain, bleeding, regular checkup | At least 2 keywords present |
| TC-006 | What causes tooth sensitivity? | enamel, dentin, erosion | At least 2 keywords present |
| TC-007 | What are signs of oral cancer? | sore, lump, red patch, white patch | At least 2 keywords present |
| TC-008 | How often should I floss? | daily, once, gumline | At least 1 keyword present |
