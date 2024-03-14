// Example: zodValidation.js
const { z } = require("zod");

const transactionValidate = z.object({
  transactionType: z.string(),
  amount: z.number(),
  transactionDate: z.date(),
});

module.exports=transactionValidate
