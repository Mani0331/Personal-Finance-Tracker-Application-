// Function to fetch transactions from the server
async function getTransactions() {
    const response = await fetch('/transactions');
    const transactions = await response.json();
    return transactions;
    }
    
    // Function to add a new transaction
    async function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    
    const newTransaction = {
    description,
    amount: parseFloat(amount),
    };
    
    const response = await fetch('/transactions', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTransaction),
    });
    
    if (response.ok) {
    // Update transaction list
    renderTransactions();
    }
    }
    
    // Function to render transactions in the table
    async function renderTransactions() {
    const transactions = await getTransactions();
    const transactionsTable = document.getElementById('transactions');
    transactionsTable.innerHTML = ''; // Clear existing rows
    
    transactions.forEach(transaction => {
    const row = transactionsTable.insertRow();
    const descriptionCell = row.insertCell();
    const amountCell = row.insertCell();
    descriptionCell.textContent = transaction.description;
    amountCell.textContent = transaction.amount;
    });
    }
    
    // Initial rendering of transactions
    renderTransactions();