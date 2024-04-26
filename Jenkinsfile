pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub-credentials'
    }
    stages {
        stage('Docker and k3s Setup') {
            steps {
                sh 'ansible-playbook docker-k3s-setup.yml -i inventory.yml' 
            }
        }
        stage('Check k3s Config Access') {
            steps {
                script {
                    sh "cat /etc/rancher/k3s/k3s.yaml"
                }
            }
        }
        stage('Build and Push Docker Images') {
            steps {
                script {
                    // Login to Docker Hub
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS_ID) {
                        // Build and push backend image
                        def backendApp = docker.build("kimo23/password-generator-backend:${env.BUILD_NUMBER}")
                        backendApp.push()

                        // Build and push frontend image (assuming public directory holds the Dockerfile for frontend)
                        def frontendApp = docker.build("kimo23/password-generator-frontend:${env.BUILD_NUMBER}", "./public")
                        frontendApp.push()
                    }
                }
            }
        }
        stage('Installing kubernetes.core collection') {
            steps {
                script {
                    sh 'ansible-galaxy collection install kubernetes.core -p ./collections'
                }
            }
        }
        stage('Configuration and Deploy with Ansible') {
            steps {
                script {
                    // Run your Ansible playbook here. Ensure Ansible is installed on the Jenkins executor.
                    sh "ansible-playbook -i inventory.yml playbook.yml --extra-vars 'backend_image_tag=${env.BUILD_NUMBER} frontend_image_tag=${env.BUILD_NUMBER}'"
                }
            }
        }
        stage('Install Prometheus1') {
            steps {
                script {
                    // Check if Prometheus is already installed, if not, install and run it
                    sh '''
                    if [ ! -f prometheus-2.26.0.linux-amd64/prometheus ]; then
                        wget https://github.com/prometheus/prometheus/releases/download/v2.26.0/prometheus-2.26.0.linux-amd64.tar.gz
                        tar xvfz prometheus-2.26.0.linux-amd64.tar.gz
                    fi
                    cd prometheus-2.26.0.linux-amd64
                    nohup ./prometheus --config.file=../../monitoring/prometheus.yml > ${WORKSPACE}/prometheus.log 2>&1 &
                    '''
                }
            }
        }


    }
}
