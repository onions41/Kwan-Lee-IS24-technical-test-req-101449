FROM python:3.10-bullseye

# Create and move to /app directory
WORKDIR /app
# Copy over the list of required Python packages
COPY requirements.txt .
# Install the listed packages
RUN python -m pip install -r requirements.txt

# Copy over application code (.dockerignore is used to ignore unecessary files)
COPY . .

# Start the API server
ENTRYPOINT ["gunicorn", "-w", "2", "-b", "0.0.0.0", "main:app"]
