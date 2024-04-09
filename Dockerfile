# Use the official Node.js 18 image based on Debian Bullseye.
FROM node:18-bullseye

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . .

# Expose port 3000 for communication to/from server
EXPOSE 3000

# Set the environment variable for the SQLite database file location
ENV SQLITE_DATABASE /data/passwords.db

# Create a directory for the SQLite database to ensure it's stored
# on a volume for persistence.
RUN mkdir /data

# At runtime, use a volume to store the SQLite database file.
VOLUME /data

# Run the web service on container startup.
CMD [ "node", "server.js" ]
