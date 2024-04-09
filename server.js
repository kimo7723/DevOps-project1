const express = require('express');
const generatePassword = require('generate-password');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route for generating passwords
app.get('/generate-password', (req, res) => {
    const password = generatePassword.generate({
        length: 10,
        numbers: true,
        uppercase: true,
        lowercase: true,
        symbols: true,
    });

    insertPassword(password);

    res.json({ password });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
