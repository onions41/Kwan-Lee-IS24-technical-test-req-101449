# Node.js Express server is used to serve the front-end application
FROM node:18

# Create and move to /app directory
WORKDIR /app
# Initiate a Node.js project
RUN npm init -y
# Install the Express server package
RUN npm install express

# Copy over the built React application code
COPY build ./build
# Copy over the Express server entry-point
COPY serve.js .

# Start the Express server
ENTRYPOINT ["node", "serve.js"]

# Best practice for security reasons when using Node.js containers
USER node