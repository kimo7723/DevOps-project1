//server.js
const express = require('express');
const { insertPassword } = require('./database');
const generatePassword = require('generate-password');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/generate-password', (req, res) => {
    const length = parseInt(req.query.length) || 20; // Default length is 20
    const options = {
        length: length,
        numbers: req.query.numbers === 'true',
        uppercase: req.query.uppercase === 'true',
        lowercase: req.query.lowercase === 'true',
        symbols: req.query.symbols === 'true'
    };

    const password = generatePassword.generate(options);
    insertPassword(password);

    res.json({ password });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
