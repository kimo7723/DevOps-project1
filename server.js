const express = require('express');
const { insertPassword } = require('./database');
const generatePassword = require('generate-password');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));


app.get('/generate-password', (req, res) => {
    const { length, numbers, uppercase, lowercase, symbols } = req.query;
    const password = generatePassword.generate({
        length: parseInt(length, 10) || 12, // Default length to 12 if not specified
        numbers: numbers === 'true',
        uppercase: uppercase === 'true',
        lowercase: lowercase === 'true',
        symbols: symbols === 'true',
    });

    insertPassword(password);
    res.json({ password });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
