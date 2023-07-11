FROM node:18

# Create and move to /app directory
# This will be the project root
WORKDIR /app

# Copy package.json and package-lock.json, then install packages
RUN npm init -y
RUN npm i express

# Copy production code
COPY build ./build
COPY serve.js .

ENTRYPOINT ["node", "serve.js"]

USER node