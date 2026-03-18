# W.I.K.T.O.R RAG Chatbot

W.I.K.T.O.R (Wikipedia Information Knowledge Tracking and Online Retrieval) is a robust and intelligent Retrieval-Augmented Generation (RAG) chatbot designed to retrieve up-to-date and reliable information from Wikipedia. It leverages vector representations and Large Language Models (LLMs) to answer questions specifically bounded by the context of any requested Wikipedia topic.

This project features three distinct interfaces for interacting with the RAG pipeline:
1. **Command Line Interface (CLI)**
2. **Streamlit Web Application**
3. **FastAPI Backend Services** (serving a static HTML frontend)

## Key Features

*   **Dynamic Knowledge Retrieval**: Fetches content directly from Wikipedia pages dynamically, ensuring the context used by the LLM is accurate and up-to-date.
*   **Vector Embeddings**: Utilizes the `sentence-transformers` library to convert textual chunks into dense vector embeddings for highly efficient semantic search.
*   **High-Speed Vector Search**: Employs `FAISS` (Facebook AI Similarity Search) to index vectors and quickly retrieve the most relevant chunks of text using similarity metrics.
*   **Intelligent Generation**: Summarizes and generates natural-sounding answers informed by the retrieved Wikipedia context using state-of-the-art transformer models.
*   **Multi-Interface Support**: Access the RAG capabilities locally via terminal, visually via a Streamlit Dashboard, or programmatically/externally via the FastAPI REST endpoints.

---

## Architecture

The application pipeline operates through five fundamental steps:
1.  **Data Loading (`wiki_loader.py`)**: Resolves the user-specified topic on Wikipedia, pulls the main content, and splits it into manageable overlapping chunks.
2.  **Embedding (`embedder.py`)**: Transforms each text chunk into a high-dimensional vector.
3.  **Vector Store (`vector_store.py`)**: Stores the chunk embeddings in a FAISS index, keeping them organized for rapid searches.
4.  **Retrieval**: Converts the user's specific query into an embedding and performs a fast similarity search across the vector store to fetch relevant data chunks.
5.  **Generation (`rag.py`)**: A generative language model uses the user's question and the retrieved text chunks to construct an accurate and concise answer.

---

## Getting Started

### Prerequisites
Make sure you have Python 3.8+ installed.

### Installation

1.  **Clone the Repository** (If applicable):
    ```bash
    git clone https://github.com/your-username/W.I.K.T.O.R-RAG.git
    cd W.I.K.T.O.R-RAG/Main-RAG
    ```

2.  **Create a Virtual Environment** (Recommended):
    ```bash
    python -m venv venv
    ```
    *   **Windows**: `venv\Scripts\activate`
    *   **Mac/Linux**: `source venv/bin/activate`

3.  **Install Dependencies**:
    The project requires PyTorch, transformers, sentence-transformers, FAISS, Streamlit, FastAPI, and more. Use the requirements file provided:
    ```bash
    pip install -r requirements.txt
    ```

---

## Usage

W.I.K.T.O.R offers 3 different ways to run the project.

### 1. Command Line Interface (CLI)
For direct terminal interaction:
```bash
python app.py
```
> **Prompt Flow:** It will ask you to enter a **Wikipedia topic**, followed by your **question**.

### 2. Streamlit Web App (Interactive dashboard)
For a user-friendly GUI to ask questions:
```bash
streamlit run web_app.py
```
> Your default web browser will open (usually `http://localhost:8501`) presenting an intuitive input form for the topic and question.

### 3. FastAPI Server
For integrating W.I.K.T.O.R as an API or serving the vanilla static UI:
```bash
python main.py
```
> Or run via uvicorn directly:
> `uvicorn main:app --reload`

Once the server is running on `http://127.0.0.1:8000`:
*   Navigate to `{baseUrl}/` to interact with the static HTML/JS frontend.
*   Send `POST` requests directly to `{baseUrl}/api/chat` with dynamic JSON payloads:
    ```json
    {
        "topic": "Artificial intelligence",
        "question": "When was AI first conceptualized?"
    }
    ```
*   View API documentation securely at `{baseUrl}/docs`.

---

## Project Structure

```text
W.I.K.T.O.R-RAG/
│
├── main.py              # FastAPI server setup and routes
├── web_app.py           # Streamlit application interface
├── app.py               # Terminal/CLI interface
├── wiki_loader.py       # Wikipedia document loading and text-chunking rules
├── embedder.py          # Sentence-transformers embedding wrapper
├── vector_store.py      # FAISS vector indexing and similarity search wrapper
├── rag.py               # Transformer model integration for answer generation
├── requirements.txt     # Complete list of project dependencies
└── static/              # Directory for static UI assets (HTML, CSS, JS)
```

## Built With
*   **[Langchain / Wikipedia API]** - Web scraping and document context
*   **[SentenceTransformers]** - Dense Vector Embeddings
*   **[FAISS]** - High-performance Vector Store
*   **[HuggingFace Transformers]** - Inference / NLP
*   **[FastAPI]** - Backend REST API Framework
*   **[Streamlit]** - Open-source App Framework

---

*This application focuses on combining factual data directly retrieved online with generative AI to minimize hallucinations and deliver solid, reliable answers!*
