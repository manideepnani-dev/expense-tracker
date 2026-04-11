import { FaTrash } from "react-icons/fa";

function TransactionList({ transactions, onDelete }) {
  return (
    <div className="list-box">
      <h2>Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="empty-text">No transactions added yet.</p>
      ) : (
        <div className="transaction-list">
          {transactions.map((item) => (
            <div className="transaction-item" key={item.id}>
              <div className="transaction-info">
                <h4>{item.title}</h4>
                <p>
                  {item.category} • {item.type} •{" "}
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>

              <div className="transaction-actions">
                <span>₹ {item.amount}</span>
                <button onClick={() => onDelete(item.id)}>
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