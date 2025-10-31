import mariadb
import os
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
from sentence_transformers import SentenceTransformer

# --- Initialization ---
app = Flask(__name__)
load_dotenv()

# --- Database Connection Details ---
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = int(os.getenv('DB_PORT', 3306))
DB_NAME = os.getenv('DB_NAME')

# --- Load AI Model (once, at startup) ---
print("🧠 Loading AI model...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("🤖 AI Model loaded and ready.")


def get_db_connection():
    """Establishes a connection to the database."""
    conn = mariadb.connect(user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT, database=DB_NAME)
    conn.autocommit = True
    return conn


# --- Web Routes ---
@app.route('/')
def index():
    """Serves the main HTML page."""
    return render_template('index.html')


@app.route('/api/search', methods=['POST'])
def search():
    """Handles the AI search query."""
    try:
        query = request.json['query']
        if not query:
            return jsonify({'error': 'Query cannot be empty'}), 400

        # Vectorize the user's query
        query_vector = model.encode(query)

        conn = get_db_connection()
        cur = conn.cursor(dictionary=True)  # Fetch results as dictionaries

        # Find the top 3 most similar airports
        # We use VECTOR_COSINE_DISTANCE to measure similarity
        sql = """
            SELECT name, city, country, iata
            FROM airports
            WHERE description_vec IS NOT NULL
            ORDER BY VECTOR_COSINE_DISTANCE(description_vec, VECTOR(?))
            LIMIT 3
        """
        cur.execute(sql, (str(list(query_vector)),))
        results = cur.fetchall()

        cur.close()
        conn.close()

        return jsonify(results)

    except Exception as e:
        print(f"Error during search: {e}")
        return jsonify({'error': 'An internal error occurred'}), 500


if __name__ == '__main__':
    app.run(debug=True)