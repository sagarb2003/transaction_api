const express = require("express");
const Transaction = require("../db/index");
const router = express.Router();
const transactionValidate = require("../zod");
const getUserIdFromToken = require("../middleware");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    // const { success } = transactionValidate.safeParse(body);

    // if (!success) {
    //   return res.status(400).json({
    //     msg: "Invalid Input",
    //   });
    // }

    const newTransaction = await Transaction.create({
      transactionType: req.body.transactionType,
      amount: req.body.amount,
      transactionDate: req.body.transactionDate,
    });

    const token = jwt.sign({ transactionId: newTransaction._id }, JWT_SECRET);

    res.status(201).json({
      msg: "Transaction created successfully",
      token,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

router.get("/", getUserIdFromToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ _id: req._id });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

router.get("/summary", getUserIdFromToken, async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $match: { _id: req._id },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: {
              $cond: {
                if: { $eq: ["$transactionType", "income"] },
                then: "$amount",
                else: 0,
              },
            },
          },
          totalExpenses: {
            $sum: {
              $cond: {
                if: { $eq: ["$transactionType", "expense"] },
                then: "$amount",
                else: 0,
              },
            },
          },
          savings: {
            $sum: {
              $cond: {
                if: { $eq: ["$transactionType", "income"] },
                then: "$amount",
                else: { $multiply: ["$amount", -1] },
              },
            },
          },
        },
      },
    ]);

    // Check if summary is empty
    if (summary.length === 0) {
      return res.status(404).json({
        msg: "No transactions found",
      });
    }

    // Return summary if not empty
    res.status(200).json({
      totalIncome: summary[0].totalIncome || 0,
      totalExpenses: summary[0].totalExpenses || 0,
      savings: summary[0].savings || 0,
    });
  } catch (error) {
    console.error("Error retrieving transaction summary:", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedTransaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    res.status(200).json({
      msg: "Transaction deleted successfully",
      deletedTransaction,
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

module.exports = router;
