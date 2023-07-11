FROM python:3.10-bullseye

WORKDIR /app
COPY requirements.txt .

RUN python -m pip install -r requirements.txt

COPY . .

# gunicorn listens on port 8000 by default
ENTRYPOINT ["gunicorn", "-w", "2", "-b", "0.0.0.0", "main:app"]
# ENTRYPOINT ["python", "main.py"]