const express = require("express");

const router = express.Router();

const transactionRouter = require("./transaction");

router.use("/transaction", transactionRouter);
module.exports = router;
