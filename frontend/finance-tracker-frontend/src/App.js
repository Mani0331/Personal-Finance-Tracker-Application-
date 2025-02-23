import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/expenses").then((response) => {
            setExpenses(response.data);
        });
    }, []);

    const addExpense = () => {
        const newExpense = { amount, category };
        axios.post("http://localhost:5000/expenses", newExpense).then((response) => {
            setExpenses([...expenses, response.data]);
            setAmount("");
            setCategory("");
        });
    };

    return (
        <div>
            <h2>Personal Finance Tracker</h2>
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <button onClick={addExpense}>Add Expense</button>
            <h3>Expenses</h3>
            <ul>
                {expenses.map((exp) => (
                    <li key={exp.id}>{exp.category}: ${exp.amount}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
