import os
import psycopg2
import rapidjson
from flask import Flask, request, Response
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
CREATE_USERS_TABLE = (
    "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, major TEXT, grade TEXT, personal_interests TEXT, career_interests TEXT, advice_types JSONB);"
)

INSERT_USER_USERS = (
    "INSERT INTO users (first_name, last_name, email, major, grade, personal_interests, career_interests, advice_types) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;"
)

app = Flask(__name__)


def connect_to_db():
    connection = psycopg2.connect(DATABASE_URL)
    return connection

@app.route("/api/user", methods=["POST"])
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
    
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_USERS_TABLE)
            cursor.execute(INSERT_USER_USERS, (first_name, last_name, email, major, grade, personal_interests, career_interests, advice_types))
    cursor.close()
    connection.close()
    return Response("User added successfully", status=200)


@app.route("/api/user", methods=["GET"])
def get_user_data():
    connection = connect_to_db()
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM user")
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
            "advice_types": row[8]
        })

    cursor.close()
    return rapidjson.dumps(user_list)

if __name__ == "__main__":
    app.run()
