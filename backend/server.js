const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const DB_FILE = "data.json";

// Load data from JSON file
function loadData() {
    if (!fs.existsSync(DB_FILE)) return { expenses: [] };
    return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

// Save data to JSON file
function saveData(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Add an expense
app.post("/expenses", (req, res) => {
    let data = loadData();
    const newExpense = {
        id: Date.now(),
        amount: req.body.amount,
        category: req.body.category,
        date: new Date().toISOString(),
    };
    data.expenses.push(newExpense);
    saveData(data);
    res.status(201).json(newExpense);
});

// Get all expenses
app.get("/expenses", (req, res) => {
    let data = loadData();
    res.json(data.expenses);
});

app.listen(5000, () => console.log("Server running on port 5000"));
