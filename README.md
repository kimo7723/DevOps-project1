## Overview

This project implements a password generator web application with a Dockerized backend API and frontend UI. The application is deployed to a Kubernetes cluster using Ansible. CI/CD pipelines are implemented in Jenkins.

![Screenshot from 2024-04-14 11-02-13](https://github.com/kimo7723/DevOps-project1/assets/113859211/fb5a499f-7399-49f5-86a6-c568f147d92b)

## Frontend

The frontend is a simple HTML, CSS and JavaScript application in the `public/` directory.

- `public/index.html` - Main HTML page 
- `public/style.css` - CSS styling
- `public/script.js` - JavaScript logic

The frontend calls the backend API to generate passwords and displays them.

## Backend

The backend is a Node.js application with Express and SQLite.

- `server.js` - Main server code with API endpoints
- `database.js` - SQLite database connection and logic

The backend generates random passwords and stores them in a SQLite database.

## Docker

The frontend and backend are containerized into separate Docker images.

- `Dockerfile` - Dockerfile for the backend
- `public/Dockerfile` - Dockerfile for the frontend

## Kubernetes Deployment

The containers are deployed to a Kubernetes cluster managed by k3s and configured using Ansible.

- `inventory.yml` - Ansible inventory file
- `ansible.cfg` - Ansible configuration
- `docker-k3s-setup.yml` - Playbook to install Docker and k3s
- `playbook.yml` - Main playbook to deploy containers

## CI/CD

Jenkins is used to implement CI/CD pipelines for building, testing and deploying the application.

- `Jenkinsfile` - Declarative Jenkins pipeline 
- `backend-deployment.yaml` - Backend Kubernetes deployment manifest
- `frontend-deployment.yaml` - Frontend Kubernetes deployment manifest

The Jenkins pipeline builds Docker images, pushes them to Docker Hub, and deploys them to the Kubernetes cluster on each commit.

## Additional Files

- `package.json` - npm configuration
