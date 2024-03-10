require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;
const databaseUrl = process.env.DATABASE_URL;

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const transactionSchema = new Schema({
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
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
