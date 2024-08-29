# Use the official Node.js image with Debian Bullseye Slim
FROM node:lts-bullseye-slim

# Install build-essential and other necessary dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package*.json ./

# Install dependencies using Yarn
RUN npm install

# Copy the rest of the application code to the container
COPY . ./

# Expose the port that the app runs on
EXPOSE 4000

# Command to start the application
CMD ["npm", "run", "dev"]
