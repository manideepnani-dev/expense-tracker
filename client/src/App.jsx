import { useState } from "react";
import SummaryCard from "./components/SummaryCard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: "Salary",
      amount: 25000,
      type: "income",
      category: "Job",
      date: "2026-04-01",
    },
    {
      id: 2,
      title: "Groceries",
      amount: 2000,
      type: "expense",
      category: "Food",
      date: "2026-04-03",
    },
    {
      id: 3,
      title: "Internet Bill",
      amount: 800,
      type: "expense",
      category: "Bills",
      date: "2026-04-05",
    },
  ]);

  function addTransaction(newTransaction) {
    const transactionWithId = {
      ...newTransaction,
      id: Date.now(),
    };

    setTransactions([transactionWithId, ...transactions]);
  }

  function deleteTransaction(id) {
    const updatedTransactions = transactions.filter((item) => item.id !== id);
    setTransactions(updatedTransactions);
  }

  let totalIncome = 0;
  let totalExpense = 0;

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "income") {
      totalIncome += Number(transactions[i].amount);
    } else {
      totalExpense += Number(transactions[i].amount);
    }
  }

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="app">
      <div className="container">
        <div className="header">
         <h1 className="app-title">Expense Tracker</h1>
         <p className="app-subtitle">Track your daily income and expenses</p>
        </div>

        <div className="summary-grid">
          <SummaryCard title="Balance" amount={totalBalance} />
          <SummaryCard title="Income" amount={totalIncome} />
          <SummaryCard title="Expense" amount={totalExpense} />
        </div>

        <div className="content-grid">
          <TransactionForm onAdd={addTransaction} />
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
