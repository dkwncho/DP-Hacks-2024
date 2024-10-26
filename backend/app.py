import os
import psycopg2
import rapidjson
from flask import Flask, request, Response
from flask_cors import CORS
from dotenv import load_dotenv
from model import generate_top_matches
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
CREATE_USERS_TABLE = (
    "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, major TEXT, grade TEXT, personal_interests TEXT, career_interests TEXT, advice_types JSONB, receive_advice BOOLEAN DEFAULT FALSE, give_advice BOOLEAN DEFAULT FALSE, description TEXT);"
)

INSERT_USER_USERS = (
    "INSERT INTO users (first_name, last_name, email, major, grade, personal_interests, career_interests, advice_types, receive_advice, give_advice,description) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;"
)

app = Flask(__name__)

CORS(app,origins=["https://pennpals.vercel.app","https://pennpals-api.vercel.app/"])

def connect_to_db():
    connection = psycopg2.connect(DATABASE_URL)
    return connection

@app.route("/api/users", methods=["POST"])
def add_user_data():
    connection = connect_to_db()
    data = request.get_json()

    first_name = data["first_name"]
    last_name = data["last_name"]
    email = data["email"]
    major = data["major"]
    grade = data["grade"]
    personal_interests = data["personal_interests"]
    career_interests = data["career_interests"]
    advice_types = rapidjson.dumps(data["advice_types"])
    receive_advice = data["receive_advice"]
    give_advice = data["give_advice"]
    description = data["description"]
    
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_USERS_TABLE)
            cursor.execute(INSERT_USER_USERS, (first_name, last_name, email, major, grade, personal_interests, career_interests, advice_types, receive_advice, give_advice, description))
    cursor.close()
    connection.close()
    return Response("User added successfully", status=200)

@app.route("/api/users", methods=["GET"])
def get_all_user_data():
    connection = connect_to_db()
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users")
            rows = cursor.fetchall()
    connection.close()
    cursor.close()

    user_list = []
    for row in rows:
        user_list.append({
            "id": row[0],
            "first_name": row[1],
            "last_name": row[2],
            "email": row[3],
            "major": row[4],
            "grade": row[5],
            "personal_interest": row[6],
            "career_interest": row[7],
            "advice_types": row[8],
            "receive_advice": row[9],
            "give_advice": row[10],
            "description": row[11]
        })

    cursor.close()
    return rapidjson.dumps(user_list)

@app.route("/api/users/<int:user_id>", methods=["GET"])
def get_user_by_id(user_id):
    connection = connect_to_db()
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
            row = cursor.fetchone()
    connection.close()
    cursor.close()

    if row:
        return rapidjson.dumps({
            "id": row[0],
            "first_name": row[1],
            "last_name": row[2],
            "email": row[3],
            "major": row[4],
            "grade": row[5],
            "personal_interest": row[6],
            "career_interest": row[7],
            "advice_types": row[8],
            "receive_advice": row[9],
            "give_advice": row[10],
            "description": row[11]
        })
    else:
        return Response("User not found", status=404)

@app.route("/api/questions", methods=["GET"])
def match_question_to_description(): # Frontend interacts with this api by posting a question as a JSON and receives the users with the three most similar descriptions
    connection = connect_to_db()
    data = request.get_json()
    question = data["question"] 

    with connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users")
            rows = cursor.fetchall()
    connection.close()
    cursor.close()

    user_list = []
    for row in rows:
        user_list.append({
            "id": row[0],
            "first_name": row[1],
            "last_name": row[2],
            "email": row[3],
            "major": row[4],
            "grade": row[5],
            "personal_interest": row[6],
            "career_interest": row[7],
            "advice_types": row[8],
            "receive_advice": row[9],
            "give_advice": row[10],
            "description": row[11]
        })
    
    descriptions = []
    original_indices = []
    for index, user in enumerate(user_list):
        descriptions.append(user["description"])
        original_indices.append(index)
    
    top_matches_indices = generate_top_matches(question, descriptions)
    top_matches = []

    for i in top_matches_indices:
        top_matches.append(user_list[original_indices[i]])

    return rapidjson.dumps(top_matches)

if __name__ == "__main__":
    app.run()
