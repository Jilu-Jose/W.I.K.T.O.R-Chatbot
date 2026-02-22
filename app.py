from wiki_loader import load_wikipedia_page, chunk_text
from embedder import Embedder
from vector_store import VectorStore
from rag import RAGChatbot

def main():
    print("=== Wikipedia RAG Chatbot ===")

    topic = input("Enter Wikipedia topic: ")
    question = input("Ask your question: ")

    # Load and process Wikipedia data
    text = load_wikipedia_page(topic)
    chunks = chunk_text(text)

    # Embedding
    embedder = Embedder()
    embeddings = embedder.embed(chunks)

    # Vector store
    vector_store = VectorStore(dimension=embeddings.shape[1])
    vector_store.add(embeddings, chunks)

    # Retrieve relevant chunks
    query_embedding = embedder.embed([question])
    relevant_chunks = vector_store.search(query_embedding, k=3)

    # Generate answer
    rag_bot = RAGChatbot()
    answer = rag_bot.generate_answer(relevant_chunks, question)

    print("\n--- Answer ---\n")
    print(answer)

if __name__ == "__main__":
    main()
