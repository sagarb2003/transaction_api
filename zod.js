// Example: zodValidation.js
const { z } = require("zod");

exports.transactionValidate = z.object({
  transactionType: z.string(),
  amount: z.number(),
  transactionDate: z.date(),
});
