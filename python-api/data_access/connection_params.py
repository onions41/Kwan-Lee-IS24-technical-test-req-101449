import os
from dotenv import load_dotenv


def get_connection_params():
    if os.path.exists(".env.development"):
        load_dotenv(".env.development")
    else:
        # Loads environment variables set by Docker and
        # from .env if it exists
        load_dotenv()

    return {
        "user": os.getenv("DB_USER"),
        "password": os.getenv("DB_PASSWORD"),
        "host": os.getenv("DB_HOST"),
        "port": os.getenv("DB_PORT"),
        "database": os.getenv("DATABASE_NAME"),
    }
