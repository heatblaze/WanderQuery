import mariadb
import os
import sys

# --- Database Configuration ---
DB_USER = 'root'
DB_PASSWORD = '1234'
DB_HOST = '127.0.0.1'
DB_PORT = 3306
DB_NAME = 'openflights'

def main():
    """Connects to MariaDB, creates schema, and loads data correctly."""
    conn = None
    try:
        # --- Connect to MariaDB ---
        conn = mariadb.connect(
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME,
            local_infile=True
        )
        print("✅ Successfully connected to MariaDB!")
        cur = conn.cursor()

        # --- Create Tables ---
        print("🔧 Creating tables from create.sql...")
        with open('../data/create.sql', 'r', encoding='utf-8') as f:
            sql_commands = f.read().split(';')
            for command in sql_commands:
                if command.strip():
                    cur.execute(command)
        print("👍 Tables created successfully.")

        # --- Load Data ---
        files_to_load = [
            'airlines.dat',
            'airports.dat',
            'countries.dat',
            'planes.dat',
            'routes.dat'
        ]

        for filename in files_to_load:
            table_name = filename.split('.')[0]
            print(f"⏳ Loading data into '{table_name}' table...")
            file_path = os.path.abspath(f'../data/{filename}').replace('\\', '/')

            # ✅ Special mapping for airports.dat
            if table_name == 'airports':
                sql = f"""
                LOAD DATA LOCAL INFILE '{file_path}'
                INTO TABLE `{table_name}`
                FIELDS TERMINATED BY ',' ENCLOSED BY '"'
                LINES TERMINATED BY '\\n'
                IGNORE 0 LINES
                (airport_id, name, city, country, iata, icao, x, y, elevation, timezone, dst, tz_id, type, source);
                """
            else:
                sql = f"""
                LOAD DATA LOCAL INFILE '{file_path}'
                INTO TABLE `{table_name}`
                FIELDS TERMINATED BY ',' ENCLOSED BY '"'
                LINES TERMINATED BY '\\n';
                """

            cur.execute(sql)
            conn.commit()
            print(f"✅ Data for '{table_name}' loaded.")

        print("\n🎉 All data has been successfully loaded into the database!")

    except mariadb.Error as e:
        print(f"❌ Error connecting to or working with MariaDB: {e}")
        sys.exit(1)
    finally:
        if conn:
            conn.close()
            print("\n🔌 Connection closed.")

if __name__ == "__main__":
    main()
