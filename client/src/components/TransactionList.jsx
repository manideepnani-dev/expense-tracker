import { FaTrash, FaEdit } from "react-icons/fa";

function TransactionList({ transactions, onDelete, onEdit }) {
  return (
    <div className="list-box">
      <h2>Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="empty-text">No transactions added yet.</p>
      ) : (
        <div className="transaction-list">
          {transactions.map((item) => (
            <div className="transaction-item" key={item._id}>
              <div className="transaction-info">
                <h4>{item.title}</h4>
                <p>
                  {item.category} •{" "}
                  <span
                    className={
                      item.type === "income"
                        ? "type-badge income-badge"
                        : "type-badge expense-badge"
                    }
                  >
                    {item.type}
                  </span>{" "}
                  • {new Date(item.date).toLocaleDateString()}
                </p>
              </div>

              <div className="transaction-actions">
                <span
                  className={
                    item.type === "income"
                      ? "amount income-text"
                      : "amount expense-text"
                  }
                >
                  ₹ {item.amount}
                </span>

                <button className="edit-btn" onClick={() => onEdit(item)}>
                  <FaEdit />
                  Edit
                </button>

                <button onClick={() => onDelete(item._id)}>
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionList;