const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // For file system operations

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Load data from JSON file
let transactions = JSON.parse(fs.readFileSync('transactions.json', 'utf8'));

// API endpoints
app.get('/transactions', (req, res) => {
res.json(transactions);
});

app.post('/transactions', (req, res) => {
const newTransaction = req.body;
transactions.push(newTransaction);
saveTransactions(); // Function to save data to JSON file
res.status(201).json(newTransaction); // 201 Created
});

// Function to save data to JSON file
function saveTransactions() {
fs.writeFileSync('transactions.json', JSON.stringify(transactions, null, 2));
}

app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});