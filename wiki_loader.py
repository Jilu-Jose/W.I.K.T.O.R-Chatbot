import wikipediaapi

def load_wikipedia_page(title: str) -> str:
    wiki = wikipediaapi.Wikipedia(
        language='en',
        user_agent='WIKTOR-RAG/1.0 (educational project)'
    )

    page = wiki.page(title)

    if not page.exists():
        raise ValueError("Wikipedia page does not exist")

    return page.text


def chunk_text(text: str, chunk_size: int = 500):
    words = text.split()
    chunks = []

    for i in range(0, len(words), chunk_size):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)

    return chunks
