import os
from dotenv import load_dotenv


def get_connection_params():
    if load_dotenv(".env.development"):
        return {
            "user": os.getenv("DB_USER"),
            "password": os.getenv("DB_PASSWORD"),
            "host": os.getenv("DB_HOST"),
            "port": os.getenv("DB_PORT"),
            "database": os.getenv("DATABASE_NAME"),
        }
