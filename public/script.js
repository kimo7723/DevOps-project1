document.getElementById('generate').addEventListener('click', function() {
    fetch('/generate-password')
        .then(response => response.json())
        .then(data => {
            document.getElementById('password').textContent = data.password;
        })
        .catch(error => console.error('Error:', error));
});
