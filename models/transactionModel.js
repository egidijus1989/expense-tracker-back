const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    description: {
      type: String,
      required: [true, "expense must have a name"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "expense must have an amount"],
    },
    date: {
      type: Date,
      required: [true, "expense must have a date"],
    },
    category: {
      type: String,
      required: [true, "expense must have an category"],
    },
    paymentType: {
      type: String,
      required: [true, "expense must have an payment method"],
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
