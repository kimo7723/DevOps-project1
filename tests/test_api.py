import requests
import time
import subprocess

def test_backend_api():
    # Start the backend container in detached mode
    container_name = "passwordgen_test"
    image = "kimo23/password-generator-backend:latest"

    subprocess.run(["docker", "run", "-d", "--rm", "--name", container_name, "-p", "8080:5000", image], check=True)
    time.sleep(3)  # wait for Flask to start

    try:
        # Make request to API
        response = requests.get("http://localhost:8080/generate")
        assert response.status_code == 200
        data = response.json()
        assert "password" in data
        assert len(data["password"]) > 5  # should be a real password
        print("✅ API test passed")

    finally:
        # Stop the container
        subprocess.run(["docker", "stop", container_name])
