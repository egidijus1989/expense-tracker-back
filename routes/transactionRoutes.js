const express = require("express");
const router = express.Router();
const transactionControllers = require("../controllers/transactionControllers");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

router.post(
  "/create-transaction",
  authentication,
  transactionControllers.createTransaction
);
router.patch(
  "/update-transaction/:id",
  authentication,
  transactionControllers.updateTransaction
);
router.delete(
  "/delete-transaction/:id",
  authentication,
  transactionControllers.deleteTransaction
);
router.get(
  "/transactions",
  authentication,
  transactionControllers.getAllTransaction
);
router.get(
  "/transaction/:id",
  authentication,
  transactionControllers.getTransaction
);
router.get(
  "/transactionsByCategory",
  authentication,
  transactionControllers.transactionsByCategory
);

module.exports = router;
