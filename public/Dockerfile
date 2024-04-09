# Use the official Nginx image.
# https://hub.docker.com/_/nginx
FROM nginx:alpine

# Copy static assets to Nginx
COPY . /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access it
# from the outside.
EXPOSE 80

# The base image handles the rest (starting Nginx)
