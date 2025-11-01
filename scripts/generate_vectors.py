import mariadb
import os
from dotenv import load_dotenv
import sys
import json
from sentence_transformers import SentenceTransformer

# --- Load Database Credentials ---
load_dotenv('../.env')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = int(os.getenv('DB_PORT', 3306))
DB_NAME = os.getenv('DB_NAME')

# --- Airport Descriptions (Our "Knowledge Base") ---
airport_descriptions = {
    'SFO': 'San Francisco, a major tech hub in the USA, known for startups and the Golden Gate bridge.',
    'LHR': 'London Heathrow, a major international airport in the UK, a global hub for business and tourism.',
    'CDG': 'Paris Charles de Gaulle, the main airport for Paris, France, the city of art, fashion, and romance.',
    'DXB': 'Dubai International, a massive global hub in the UAE, known for luxury, shopping, and modern architecture.',
    'NRT': 'Tokyo Narita, a primary airport for Tokyo, Japan, a city blending futuristic technology with ancient traditions.',
    'BCN': 'Barcelona-El Prat, a major airport in Spain, famous for its unique architecture, vibrant nightlife, and sunny beaches.',
    'FCO': 'Rome Fiumicino, the main airport for Rome, Italy, a city steeped in ancient history, art, and delicious food.',
    'SIN': 'Singapore Changi, a world-class airport in Singapore, a major financial center in Asia known for its gardens and cleanliness.',
    'BKK': 'Bangkok Suvarnabhumi, the main airport for Bangkok, Thailand, a bustling city famous for street food, temples, and vibrant markets.',
    'SYD': 'Sydney Kingsford Smith, the primary airport for Sydney, Australia, known for its iconic opera house, harbour, and beaches.'
}


def main():
    """Adds vector capabilities to the database and generates embeddings."""
    conn = None
    try:
        conn = mariadb.connect(
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME
        )
        cur = conn.cursor()
        print("✅ Successfully connected to MariaDB.")

        # 1. Alter table to add new columns (skip if already there)
        print("🔧 Modifying 'airports' table to add description and vector columns...")
        try:
            cur.execute("ALTER TABLE airports ADD COLUMN description TEXT")
            cur.execute("ALTER TABLE airports ADD COLUMN description_vec LONGTEXT")
            print("👍 Table altered successfully.")
        except mariadb.Error as e:
            if "Duplicate column name" in str(e):
                print("🔹 Columns already exist. Skipping.")
            else:
                raise e

        # 2. Add airport descriptions
        print("✍️ Updating airports with descriptions...")
        for iata_code, desc in airport_descriptions.items():
            cur.execute("UPDATE airports SET description = ? WHERE iata = ?", (desc, iata_code))
        conn.commit()
        print("✅ Airport descriptions updated.")

        # 3. Generate and store vectors
        print("🧠 Loading AI model... (This might take a moment on first run)")
        model = SentenceTransformer('all-MiniLM-L6-v2')
        print("🤖 Model loaded. Generating and storing vectors...")

        cur.execute("SELECT apid, description FROM airports WHERE description IS NOT NULL")
        airports_to_vectorize = cur.fetchall()

        count = 0
        for apid, description in airports_to_vectorize:
            vector = model.encode(description)
            vector_json = json.dumps(vector.tolist())  # Store as JSON text
            cur.execute("UPDATE airports SET description_vec = ? WHERE apid = ?", (vector_json, apid))
            count += 1

        conn.commit()
        print(f"✅ Generated and stored vectors for {count} airports.")
        print("\n🎉 Database is now ready for AI-powered searches!")

    except mariadb.Error as e:
        print(f"❌ Error: {e}")
        sys.exit(1)
    finally:
        if conn:
            conn.close()
            print("\n🔌 Connection closed.")


if __name__ == "__main__":
    main()
