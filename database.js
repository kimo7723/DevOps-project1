const sqlite3 = require('sqlite3').verbose();

// Connect to a database (creates the file if it does not exist)
const db = new sqlite3.Database('./db/passwords.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create a table to store passwords (if it doesn't exist)
db.run('CREATE TABLE IF NOT EXISTS passwords(id INTEGER PRIMARY KEY AUTOINCREMENT, password TEXT NOT NULL)', (err) => {
    if (err) {
        console.error('Error creating table', err.message);
    } else {
        console.log('Table created or already exists.');
    }
});

// Function to insert a generated password into the database
function insertPassword(password) {
    db.run(`INSERT INTO passwords(password) VALUES(?)`, [password], function(err) {
        if (err) {
            console.error('Error inserting password', err.message);
        } else {
            console.log(`A password has been inserted with rowid ${this.lastID}`);
        }
    });
}

module.exports = { insertPassword };
