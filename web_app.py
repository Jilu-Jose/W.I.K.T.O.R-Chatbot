import streamlit as st
from wiki_loader import load_wikipedia_page, chunk_text
from embedder import Embedder
from vector_store import VectorStore
from rag import RAGChatbot

st.set_page_config(page_title="Wikipedia RAG Chatbot")

st.title("W.I.K.T.O.R")

topic = st.text_input("Wikipedia Topic")
question = st.text_input("Your Question")

if st.button("Ask"):
    with st.spinner("Processing..."):
        text = load_wikipedia_page(topic)
        chunks = chunk_text(text)

        embedder = Embedder()
        embeddings = embedder.embed(chunks)

        store = VectorStore(embeddings.shape[1])
        store.add(embeddings, chunks)

        q_emb = embedder.embed([question])
        context = store.search(q_emb)

        bot = RAGChatbot()
        answer = bot.generate_answer(context, question)

    st.subheader("Answer")
    st.write(answer)
