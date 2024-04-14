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
            showCopiedNotification();
        })
        .catch(error => console.error('Error:', error));
});

// Update this function for the range input
document.getElementById('length').addEventListener('input', function() {
    document.getElementById('length-value').textContent = this.value;
});

// Add this function
function showCopiedNotification() {

  // Create notification element
  const notification = document.createElement('div');
  notification.classList.add('copied');
  notification.textContent = 'Copied!';

  // Append to body
  document.body.appendChild(notification);

  // Remove after 2 seconds
  setTimeout(() => {
    notification.remove(); 
  }, 2000);

}