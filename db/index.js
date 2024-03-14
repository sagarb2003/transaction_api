const mongoose = require("mongoose");
const { Schema } = mongoose;

const userAccountSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
});

const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "UserAccount",
    required: true,
  },
  transactionType: {
    type: String,
    enum: ["expense", "income"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type:String,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
const UserAccount = mongoose.model("UserAccount", userAccountSchema);

module.exports = { Transaction, UserAccount };
