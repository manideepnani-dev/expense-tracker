import { useState } from "react";

function TransactionForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !amount || !category || !date) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      title: title,
      amount: Number(amount),
      type: type,
      category: category,
      date: date,
    };

    onAdd(newTransaction);

    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("");
    setDate("");
  }

  return (
    <div className="form-box">
      <h2>Add Transaction</h2>

      <form onSubmit={handleSubmit} className="transaction-form">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default TransactionForm;