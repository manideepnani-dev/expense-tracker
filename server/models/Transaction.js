const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title"]
  },
  amount: {
    type: Number,
    required: [true, "Please add an amount"]
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: [true, "Please select a type"]
  },
  category: {
    type: String,
    trim: true,
    required: [true, "Please add a category"]
  },
  date: {
    type: Date,
    required: [true, "Please add a date"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Transaction", TransactionSchema);