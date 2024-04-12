document.getElementById('generate').addEventListener('click', function() {
    const length = document.getElementById('length').value;
    const numbers = document.getElementById('numbers').checked;
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const symbols = document.getElementById('symbols').checked;

    fetch(`/generate-password?length=${length}&numbers=${numbers}&uppercase=${uppercase}&lowercase=${lowercase}&symbols=${symbols}`)
        .then(response => response.json())
        .then(data => {
            const passwordField = document.getElementById('password');
            passwordField.textContent = data.password;
            navigator.clipboard.writeText(data.password); // Auto-copy feature
        })
        .catch(error => console.error('Error:', error));
});
