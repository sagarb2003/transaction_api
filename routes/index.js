const express = require("express");

const router = express.Router();

const transactionRouter = require("./transaction");

router.use("/user", transactionRouter);
module.exports = router;
