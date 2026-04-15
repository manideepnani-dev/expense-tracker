import { useEffect, useState } from "react";
import axios from "axios";
import SummaryCard from "./components/SummaryCard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editData, setEditData] = useState(null);

  const API_URL = "http://localhost:5000/api/transactions";

  useEffect(() => {
    getTransactions();
  }, []);

  async function getTransactions() {
    try {
      const res = await axios.get(API_URL);
      setTransactions(res.data);
    } catch (error) {
      console.log("Error fetching transactions");
    }
  }

  async function addTransaction(transaction) {
    try {
      const res = await axios.post(API_URL, transaction);
      setTransactions([res.data, ...transactions]);
    } catch (error) {
      console.log("Error adding transaction");
    }
  }

  async function updateTransaction(id, updatedTransaction) {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedTransaction);

      const updatedList = transactions.map((item) =>
        item._id === id ? res.data : item
      );

      setTransactions(updatedList);
      setEditData(null);
    } catch (error) {
      console.log("Error updating transaction");
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedTransactions = transactions.filter(
        (item) => item._id !== id
      );
      setTransactions(updatedTransactions);
    } catch (error) {
      console.log("Error deleting transaction");
    }
  }

  let income = 0;
  let expense = 0;

  transactions.forEach((item) => {
    if (item.type === "income") {
      income += Number(item.amount);
    } else {
      expense += Number(item.amount);
    }
  });

  const balance = income - expense;

  let filteredTransactions = transactions;

  if (filter === "income") {
    filteredTransactions = transactions.filter((item) => item.type === "income");
  } else if (filter === "expense") {
    filteredTransactions = transactions.filter((item) => item.type === "expense");
  }

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1 className="app-title">Expense Tracker</h1>
          <p className="app-subtitle">Track your daily income and expenses</p>
        </div>

        <div className="summary-grid">
          <SummaryCard title="Balance" amount={balance} />
          <SummaryCard title="Income" amount={income} />
          <SummaryCard title="Expense" amount={expense} />
        </div>

        <div className="content-grid">
          <TransactionForm
            onAdd={addTransaction}
            onUpdate={updateTransaction}
            editData={editData}
          />

          <div>
            <div className="filter-buttons">
              <button
                className={filter === "all" ? "active-filter" : ""}
                onClick={() => setFilter("all")}
              >
                All
              </button>

              <button
                className={filter === "income" ? "active-filter" : ""}
                onClick={() => setFilter("income")}
              >
                Income
              </button>

              <button
                className={filter === "expense" ? "active-filter" : ""}
                onClick={() => setFilter("expense")}
              >
                Expense
              </button>
            </div>

            <TransactionList
              transactions={filteredTransactions}
              onDelete={deleteTransaction}
              onEdit={setEditData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;