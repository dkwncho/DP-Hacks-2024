import os
import psycopg2
import rapidjson
from flask import Flask, request, Response
from flask_cors import CORS
from dotenv import load_dotenv
import requests

load_dotenv()

DATABASE_URL = "postgresql://neondb_owner:yoQscai9O4Tg@ep-orange-frog-a56nf1uu.us-east-2.aws.neon.tech/neondb?sslmode=require"
CREATE_USERS_TABLE = (
    "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, major TEXT, grade TEXT, receive_advice BOOLEAN DEFAULT FALSE, give_advice BOOLEAN DEFAULT FALSE, description TEXT);"
)
INSERT_USER_USERS = (
    "INSERT INTO users (first_name, last_name, email, major, grade, receive_advice, give_advice,description) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;"
)
API_URL = os.getenv("API_URL")
headers = os.getenv("headers")

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app)

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
    receive_advice = data["receive_advice"]
    give_advice = data["give_advice"]
    description = data["description"]
    
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_USERS_TABLE)
            cursor.execute(INSERT_USER_USERS, (first_name, last_name, email, major, grade, receive_advice, give_advice, description))
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
            "receive_advice": row[6],
            "give_advice": row[7],
            "description": row[8]
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
            "receive_advice": row[6],
            "give_advice": row[7],
            "description": row[8]
        })
    else:
        return Response("User not found", status=404)

@app.route("/api/questions", methods=["POST"])
def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

if __name__ == "__main__":
    app.run()
