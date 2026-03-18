<div align="center">

<br/>

```
██╗    ██╗██╗██╗  ██╗████████╗ ██████╗ ██████╗
██║    ██║██║██║ ██╔╝╚══██╔══╝██╔═══██╗██╔══██╗
██║ █╗ ██║██║█████╔╝    ██║   ██║   ██║██████╔╝
██║███╗██║██║██╔═██╗    ██║   ██║   ██║██╔══██╗
╚███╔███╔╝██║██║  ██╗   ██║   ╚██████╔╝██║  ██║
 ╚══╝╚══╝ ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
```

# Wikipedia Information Knowledge Tracking & Online Retrieval

**An intelligent RAG chatbot that retrieves real-time Wikipedia knowledge and generates accurate, hallucination-resistant answers using LLMs**

<br/>

[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Streamlit](https://img.shields.io/badge/Streamlit-Web_App-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white)](https://streamlit.io)
[![HuggingFace](https://img.shields.io/badge/HuggingFace-Transformers-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)](https://huggingface.co)
[![FAISS](https://img.shields.io/badge/FAISS-Vector_Search-0078D4?style=for-the-badge&logo=meta&logoColor=white)](https://faiss.ai)

<br/>

</div>

---

## ![overview](https://img.shields.io/badge/-Overview-1a1a2e?style=flat-square&logo=readme&logoColor=white) Overview

**W.I.K.T.O.R** is a robust Retrieval-Augmented Generation (RAG) chatbot that fetches live content from any Wikipedia topic, encodes it into semantic vector embeddings, and uses a generative language model to produce accurate, grounded answers — all bounded strictly by the retrieved context to minimize hallucinations.

Three distinct interfaces are available for interacting with the pipeline:

| | Interface | Best For |
|---|---|---|
| ![](https://img.shields.io/badge/CLI-333333?style=flat-square&logo=windowsterminal&logoColor=white) | **Command Line Interface** | Direct terminal interaction and scripting |
| ![](https://img.shields.io/badge/Streamlit-FF4B4B?style=flat-square&logo=streamlit&logoColor=white) | **Streamlit Web App** | Visual, user-friendly dashboard |
| ![](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) | **FastAPI REST Server** | Programmatic access and static HTML frontend |

---

## ![features](https://img.shields.io/badge/-Key_Features-1a1a2e?style=flat-square&logo=todoist&logoColor=white) Key Features

| | Feature | Description |
|---|---|---|
| ![](https://img.shields.io/badge/Dynamic_Retrieval-0A66C2?style=flat-square&logo=wikipedia&logoColor=white) | **Dynamic Knowledge Retrieval** | Fetches live Wikipedia content per query — always accurate and up-to-date |
| ![](https://img.shields.io/badge/Vector_Embeddings-FFD21E?style=flat-square&logo=huggingface&logoColor=black) | **Vector Embeddings** | Converts text chunks into dense semantic vectors via `sentence-transformers` |
| ![](https://img.shields.io/badge/FAISS_Search-0078D4?style=flat-square&logo=meta&logoColor=white) | **High-Speed Vector Search** | FAISS indexes embeddings for lightning-fast similarity retrieval |
| ![](https://img.shields.io/badge/LLM_Generation-FF6F00?style=flat-square&logo=tensorflow&logoColor=white) | **Intelligent Generation** | State-of-the-art transformer models generate natural, context-grounded answers |
| ![](https://img.shields.io/badge/Multi--Interface-6A0DAD?style=flat-square&logo=dependabot&logoColor=white) | **Multi-Interface Support** | CLI, Streamlit dashboard, or FastAPI REST endpoints — choose your workflow |

---

## ![arch](https://img.shields.io/badge/-Architecture-1a1a2e?style=flat-square&logo=diagrams.net&logoColor=white) Architecture

The RAG pipeline operates through five sequential stages:

```
  User Query + Wikipedia Topic
           │
           ▼
┌──────────────────────────┐
│  1. wiki_loader.py       │  Resolves topic on Wikipedia, pulls
│     Data Loading         │  main content, splits into overlapping
│                          │  text chunks
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  2. embedder.py          │  Transforms each text chunk into a
│     Vector Embedding     │  high-dimensional semantic vector
│                          │  via sentence-transformers
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  3. vector_store.py      │  Stores chunk embeddings in a FAISS
│     FAISS Indexing       │  index for rapid similarity lookups
│                          │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  4. Retrieval            │  Encodes the user query and performs
│     Similarity Search    │  fast nearest-neighbour search to
│                          │  fetch the most relevant chunks
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  5. rag.py               │  Generative model uses the query +
│     Answer Generation    │  retrieved chunks to produce an
│                          │  accurate, grounded answer
└──────────────────────────┘
           │
           ▼
     Final Answer
```

---

## ![stack](https://img.shields.io/badge/-Tech_Stack-1a1a2e?style=flat-square&logo=stackshare&logoColor=white) Tech Stack

```
┌──────────────┐  ┌────────────────────────────────────────────────┐
│  FRONTEND    │  │  Static HTML · CSS · Vanilla JS                │
├──────────────┤  ├────────────────────────────────────────────────┤
│  WEB APP     │  │  Streamlit                                     │
├──────────────┤  ├────────────────────────────────────────────────┤
│  API SERVER  │  │  FastAPI · Uvicorn                             │
├──────────────┤  ├────────────────────────────────────────────────┤
│  RAG ENGINE  │  │  SentenceTransformers · FAISS · HuggingFace    │
├──────────────┤  ├────────────────────────────────────────────────┤
│  DATA        │  │  Wikipedia API · LangChain · PyTorch           │
└──────────────┘  └────────────────────────────────────────────────┘
```

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn-4B0082?style=flat-square&logo=uvicorn&logoColor=white)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=flat-square&logo=streamlit&logoColor=white)
![HuggingFace](https://img.shields.io/badge/HuggingFace-FFD21E?style=flat-square&logo=huggingface&logoColor=black)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)
![FAISS](https://img.shields.io/badge/FAISS-0078D4?style=flat-square&logo=meta&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=flat-square&logo=langchain&logoColor=white)
![Wikipedia](https://img.shields.io/badge/Wikipedia_API-000000?style=flat-square&logo=wikipedia&logoColor=white)

---

## ![start](https://img.shields.io/badge/-Getting_Started-1a1a2e?style=flat-square&logo=dependabot&logoColor=white) Getting Started

### Prerequisites

![Python](https://img.shields.io/badge/Python-3.8+_required-3776AB?style=flat-square&logo=python&logoColor=white)
![pip](https://img.shields.io/badge/pip-package_manager-3775A9?style=flat-square&logo=pypi&logoColor=white)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/W.I.K.T.O.R-RAG.git
cd W.I.K.T.O.R-RAG/Main-RAG
```

**2. Create a virtual environment** *(recommended)*
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

**3. Install dependencies**
```bash
pip install -r requirements.txt
```

> Installs PyTorch, Transformers, sentence-transformers, FAISS, Streamlit, FastAPI, and all other required packages.

---

## ![usage](https://img.shields.io/badge/-Usage-1a1a2e?style=flat-square&logo=gnubash&logoColor=white) Usage

W.I.K.T.O.R offers three ways to run the project. Choose the interface that fits your workflow.

---

### ![cli](https://img.shields.io/badge/01-CLI-333333?style=flat-square&logo=windowsterminal&logoColor=white) Command Line Interface

For direct terminal interaction:

```bash
python app.py
```

The CLI will prompt you sequentially:

```
Enter a Wikipedia topic: Artificial Intelligence
Enter your question: When was AI first conceptualized?
```

---

### ![streamlit](https://img.shields.io/badge/02-Streamlit_Web_App-FF4B4B?style=flat-square&logo=streamlit&logoColor=white) Streamlit Web App

For a visual, user-friendly dashboard:

```bash
streamlit run web_app.py
```

Opens automatically at **`http://localhost:8501`** — provides an intuitive input form for topic and question.

---

### ![fastapi](https://img.shields.io/badge/03-FastAPI_Server-009688?style=flat-square&logo=fastapi&logoColor=white) FastAPI Server

For programmatic access or serving the static HTML frontend:

```bash
python main.py

# Or directly via uvicorn
uvicorn main:app --reload
```

Server runs at **`http://127.0.0.1:8000`**

| Endpoint | Method | Description |
|---|---|---|
| `/` | `GET` | Static HTML / JS frontend |
| `/api/chat` | `POST` | RAG query endpoint |
| `/docs` | `GET` | Interactive API documentation (Swagger UI) |

#### Example Request — `POST /api/chat`

```json
{
    "topic": "Artificial intelligence",
    "question": "When was AI first conceptualized?"
}
```

#### Example Response

```json
{
    "answer": "The concept of artificial intelligence was first formally introduced in 1956 at the Dartmouth Conference, organized by John McCarthy, who also coined the term 'artificial intelligence'.",
    "sources": ["Artificial intelligence - Wikipedia"],
    "confidence": "high"
}
```

---

## ![structure](https://img.shields.io/badge/-Project_Structure-1a1a2e?style=flat-square&logo=files&logoColor=white) Project Structure

```
W.I.K.T.O.R-RAG/
│
├── main.py              # FastAPI server — routes and startup
├── web_app.py           # Streamlit application interface
├── app.py               # CLI / terminal interface
│
├── wiki_loader.py       # Wikipedia document loading and text-chunking
├── embedder.py          # Sentence-transformers embedding wrapper
├── vector_store.py      # FAISS vector indexing and similarity search
├── rag.py               # Transformer model integration for generation
│
├── requirements.txt     # Complete project dependencies
└── static/              # Static UI assets (HTML, CSS, JS)
```

---

## ![built](https://img.shields.io/badge/-Built_With-1a1a2e?style=flat-square&logo=opensourceinitiative&logoColor=white) Built With

| Library | Role |
|---|---|
| ![](https://img.shields.io/badge/Wikipedia_API_/_LangChain-grey?style=flat-square&logo=wikipedia&logoColor=white) | Web content retrieval and document chunking |
| ![](https://img.shields.io/badge/SentenceTransformers-grey?style=flat-square&logo=huggingface&logoColor=white) | Dense semantic vector embeddings |
| ![](https://img.shields.io/badge/FAISS-grey?style=flat-square&logo=meta&logoColor=white) | High-performance vector store and similarity search |
| ![](https://img.shields.io/badge/HuggingFace_Transformers-grey?style=flat-square&logo=huggingface&logoColor=white) | LLM inference and answer generation |
| ![](https://img.shields.io/badge/FastAPI-grey?style=flat-square&logo=fastapi&logoColor=white) | Backend REST API framework |
| ![](https://img.shields.io/badge/Streamlit-grey?style=flat-square&logo=streamlit&logoColor=white) | Interactive web application framework |

---

<div align="center">

Combining live factual retrieval with generative AI to deliver reliable, hallucination-resistant answers

[![Python](https://img.shields.io/badge/Made_with-Python-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![HuggingFace](https://img.shields.io/badge/Powered_by-HuggingFace-FFD21E?style=flat-square&logo=huggingface&logoColor=black)](https://huggingface.co)
[![FastAPI](https://img.shields.io/badge/API-FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)

</div>