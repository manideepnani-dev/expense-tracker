import { FaWallet } from "react-icons/fa";
import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";

function SummaryCard({ title, amount }) {
  let icon;
  let iconClass;

  if (title === "Balance") {
    icon = <FaWallet />;
    iconClass = "balance-icon";
  } else if (title === "Income") {
    icon = <HiArrowTrendingUp />;
    iconClass = "income-icon";
  } else {
    icon = <HiArrowTrendingDown />;
    iconClass = "expense-icon";
  }

  return (
    <div className="summary-card">
      <div className={`summary-icon ${iconClass}`}>{icon}</div>

      <div className="summary-text">
        <h3>{title}</h3>
        <p>₹ {amount}</p>
      </div>
    </div>
  );
}

export default SummaryCard;