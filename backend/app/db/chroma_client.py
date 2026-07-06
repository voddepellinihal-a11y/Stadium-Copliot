import chromadb
from chromadb.config import Settings as ChromaSettings
from chromadb.utils import embedding_functions
from app.core.config import settings as app_settings
import json
import os


chroma_client = None
collection = None


def get_embedding_function():
    if app_settings.GEMINI_API_KEY:
        return embedding_functions.GoogleGenerativeAiEmbeddingFunction(
            api_key=app_settings.GEMINI_API_KEY
        )
    return embedding_functions.DefaultEmbeddingFunction()


def init_chroma():
    global chroma_client, collection

    persist_dir = app_settings.CHROMA_PERSIST_DIR
    os.makedirs(persist_dir, exist_ok=True)

    chroma_client = chromadb.PersistentClient(
        path=persist_dir,
        settings=ChromaSettings(anonymized_telemetry=False),
    )

    embedding_fn = get_embedding_function()

    collection = chroma_client.get_or_create_collection(
        name="stadium_knowledge",
        embedding_function=embedding_fn,
    )

    return chroma_client, collection


def load_knowledge_base(city: str = "metlife"):
    base_path = os.path.join("knowledge_bases", city)
    if not os.path.exists(base_path):
        base_path = "knowledge_bases"

    docs = []
    metadatas = []
    ids = []

    for root, _, files in os.walk(base_path):
        for fname in files:
            if fname.endswith(".json"):
                filepath = os.path.join(root, fname)
                with open(filepath, "r") as f:
                    data = json.load(f)
                    _flatten_json(data, docs, metadatas, ids, source=fname)

    if docs and collection:
        collection.add(documents=docs, metadatas=metadatas, ids=ids)

    return len(docs)


def _flatten_json(data, docs, metadatas, ids, prefix="", source=""):
    if isinstance(data, dict):
        for key, value in data.items():
            new_prefix = f"{prefix}_{key}" if prefix else key
            _flatten_json(value, docs, metadatas, ids, new_prefix, source)
    elif isinstance(data, list):
        for i, item in enumerate(data):
            new_prefix = f"{prefix}_{i}" if prefix else str(i)
            _flatten_json(item, docs, metadatas, ids, new_prefix, source)
    else:
        doc_str = f"{prefix}: {data}"
        docs.append(str(data))
        metadatas.append({"key": prefix, "source": source})
        ids.append(f"{source}_{prefix}_{len(docs)}")


def query_knowledge(query: str, n_results: int = 5):
    if not collection:
        return {"documents": [[]], "metadatas": [[]], "distances": [[]]}
    return collection.query(query_texts=[query], n_results=n_results)
