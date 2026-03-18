import os
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

from wiki_loader import load_wikipedia_page, chunk_text
from embedder import Embedder
from vector_store import VectorStore
from rag import RAGChatbot

app = FastAPI(title="W.I.K.T.O.R RAG API")

# Ensure static directory exists
os.makedirs("static", exist_ok=True)
os.makedirs("static/css", exist_ok=True)
os.makedirs("static/js", exist_ok=True)
os.makedirs("static/assets", exist_ok=True)

app.mount("/static", StaticFiles(directory="static"), name="static")

class ChatRequest(BaseModel):
    topic: str
    question: str

@app.get("/")
async def read_index():
    return FileResponse("static/index.html")

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        # 1. Load and process Wikipedia data
        text = load_wikipedia_page(request.topic)
        chunks = chunk_text(text)

        # 2. Embedding
        embedder = Embedder()
        embeddings = embedder.embed(chunks)

        # 3. Vector store
        vector_store = VectorStore(dimension=embeddings.shape[1])
        vector_store.add(embeddings, chunks)

        # 4. Retrieve relevant chunks
        query_embedding = embedder.embed([request.question])
        relevant_chunks = vector_store.search(query_embedding, k=3)

        # 5. Generate answer
        rag_bot = RAGChatbot()
        answer = rag_bot.generate_answer(relevant_chunks, request.question)

        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1",port=8000, reload=True)


