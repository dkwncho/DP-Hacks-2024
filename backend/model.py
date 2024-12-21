from sentence_transformers import SentenceTransformer
import numpy as np
import requests


def generate_top_matches(question, descriptions):
    model = SentenceTransformer('all-MiniLM-L6-v2')

    question_embeddings = model.encode(question)
    description_embeddings = model.encode(descriptions)

    model.encode

    similarities_tensor = model.similarity(question_embeddings, description_embeddings)
    similarities_list = similarities_tensor.tolist()[0]

    top_matches_indices = np.argsort(similarities_list)[:3][::-1]

    return top_matches_indices