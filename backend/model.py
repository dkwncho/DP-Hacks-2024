
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

# Load pre-trained BERT-based model from Hugging Face
model = SentenceTransformer('./sentence-embedding-model')

sentences = [
    "Hi! I'm a software developer studying CS and linguistics who loves competitive programmings and making new apps. I love my dog and the Yankees :)",
    "Passionate about social justice, Alex spends weekends volunteering at local non-profits and organizing awareness campaigns on campus. With dreams of attending law school, they eagerly participate in mock trial competitions to hone their advocacy skills",
    "A coding whiz, Sofia spends her evenings developing apps that address everyday challenges, from improving study habits to promoting mental health. She’s also an active member of the Hackathon club, where she collaborates with peers to build innovative projects and compete in coding competitions",
    "A budding poet, Marco hosts weekly open mic nights at a campus café, where he shares his work and encourages others to explore their creativity. He’s also a member of the literary magazine, helping to showcase diverse voices from the UPenn community.",
    "With a keen interest in entrepreneurship, Tina runs a start-up that connects students with local businesses for internships. She’s also involved in the Women in Business club, where she champions female leaders and mentors aspiring entrepreneurs.",
    "I want to work at Morgan Stanley",
    "I want to become a mentor for undergraduates looking to work in finance",
    "I want to create a startup which supports freelance short story writers and modern poets"
]

# Step 1: Generate embeddings for the preset career fields
embeddings = model.encode(sentences)

model.encode

# # Step 2: Function to match user input to career fields
# def match_career_fields(user_input, top_n=3):
#     # Generate embedding for the user input
#     input_embedding = model.encode([user_input])
    
#     # Compute similarity with each career field using cosine similarity
#     similarities = cosine_similarity(input_embedding, career_field_embeddings)[0]
    
#     # Get top N career fields based on similarity scores
#     top_indices = np.argsort(similarities)[::-1][:top_n]
#     top_fields = [(career_fields[i], similarities[i]) for i in top_indices]
    
#     return top_fields

# Example Usage
# user_input = input("Enter user prompt:")

# Let's create a matrix to store the cosine similarity scores
similarity_matrix = np.zeros((len(sentences), len(sentences)))

similarities = model.similarity(embeddings, embeddings)

# # Compute the cosine similarity between each pair of embeddings
# for i in range(len(embeddings)):
#     similarity_matrix[i, i] = 1
#     for j in range(i + 1, len(embeddings)):
#         result = cosine_similarity(embeddings[i], embeddings[j]).item()
#         similarity_matrix[i, j] = result
#         similarity_matrix[j, i] = result
#         print(f'The cosine similarity between the BART embeddings of Sentence {i + 1} and Sentence {j + 1} is {result:.2f}')

# We can also visualize the cosine similarity scores using a heatmap

x_ticks = [f'Sent # {i + 1}' for i in range(len(sentences))]


# Assuming similarity_matrix and x_ticks are already defined
# Example: similarity_matrix = np.random.rand(10, 10)

def plot_heatmap(similarities, title, x_ticks, y_ticks, x_label, y_label, valfmt='{x:.2f}', cmap="Blues"):
    # Create the plot
    fig, ax = plt.subplots(figsize=(10, 8))

    # Create heatmap with annotations
    sns.heatmap(similarities, annot=True, fmt=valfmt, cmap=cmap, xticklabels=x_ticks, yticklabels=y_ticks, ax=ax)

    # Set the title and axis labels
    ax.set_title(title, fontsize=14, pad=12)
    ax.set_xlabel(x_label, fontsize=12)
    ax.set_ylabel(y_label, fontsize=12)

    # Rotate x-tick labels if needed
    plt.xticks(rotation=90)

    # Display the plot
    plt.tight_layout()
    plt.show()

plt.figure(figsize=(8, 6))
sns.heatmap(similarities, cmap='viridis', annot=True, cbar=True, vmin=0, vmax=1, xticklabels = sentences, yticklabels = sentences)
plt.title('Heatmap')
plt.show()