import os
from dotenv import load_dotenv


def get_connection_params():
    if os.path.exists(".env.development"):
        # Loads development environment variables
        load_dotenv(".env.development")
    else:
        # Loads environment variables set by Docker
        load_dotenv()

    # Environment variables will be used to connect to the database
    return {
        "user": os.getenv("DB_USER"),
        "password": os.getenv("DB_PASSWORD"),
        "host": os.getenv("DB_HOST"),
        "port": os.getenv("DB_PORT"),
        "database": os.getenv("DATABASE_NAME"),
    }
