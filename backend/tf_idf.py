from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def tfidf_similarity(question, description):
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform([question, description])
        return cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]

def generate_top_matches(question,descriptions):
    similarities_list = []
    for description in descriptions:
        similarity = tfidf_similarity(question, description)
        similarities_list.append(similarity)
    
    top_matches_indices = np.argsort(similarities_list)[:3][::-1]

    return top_matches_indices