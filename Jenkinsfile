pipeline {
    agent any
    environment {
        DOCKERHUB_USERNAME = 'kimo23'
        DOCKERHUB_PASSWORD = credentials('dockerhub-credentials-id')
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build & Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
                        // Build and push backend image
                        def backendImage = docker.build("yourdockerhubusername/password-generator-backend:${env.BUILD_ID}")
                        backendImage.push("latest")
                        
                        // Build and push frontend image
                        def frontendImage = docker.build("yourdockerhubusername/password-generator-frontend:${env.BUILD_ID}")
                        frontendImage.push("latest")
                    }
                }
            }
        }
        stage('Deploy with Ansible') {
            steps {
                script {
                    // Assuming Ansible and required collections are installed on Jenkins agent
                    sh 'ansible-playbook -i inventory playbook.yml --extra-vars "dockerhub_username=$DOCKERHUB_USERNAME dockerhub_password=$DOCKERHUB_PASSWORD"'
                }
            }
        }
    }
}
