from transformers import pipeline

class RAGChatbot:
    def __init__(self):
        self.generator = pipeline(
            "text-generation",
            model="distilgpt2"
        )

    def generate_answer(self, context_chunks, question):
        context = "\n".join(context_chunks)

        prompt = f"""
Answer the question using only the context below.

Context:
{context}

Question:
{question}

Answer:
"""
        result = self.generator(
            prompt,
            max_length=200,
            do_sample=True,
            temperature=0.7
        )

        return result[0]["generated_text"]
