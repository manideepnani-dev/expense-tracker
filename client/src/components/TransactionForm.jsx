import { useEffect, useState } from "react";

function TransactionForm({ onAdd, onUpdate, editData }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setAmount(editData.amount);
      setType(editData.type);
      setCategory(editData.category);
      setDate(editData.date ? editData.date.split("T")[0] : "");
    }
  }, [editData]);

  function clearForm() {
    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("");
    setDate("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !amount || !category || !date) {
      alert("Please fill all fields");
      return;
    }

    const transactionData = {
      title,
      amount,
      type,
      category,
      date,
    };

    if (editData) {
      onUpdate(editData._id, transactionData);
    } else {
      onAdd(transactionData);
    }

    clearForm();
  }

  return (
    <div className="form-box">
      <h2>{editData ? "Edit Transaction" : "Add Transaction"}</h2>

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

        <button type="submit">
          {editData ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;