const Transaction = require("../models/transactionModel");

///////////////////////////////////////////////////////////////////
exports.createTransaction = async (req, res) => {
  try {
    const sessionUserId = req.user._id;

    const uploadTransaction = new Transaction({
      ...req.body,
      user: sessionUserId,
    });
    const saveTransaction = await uploadTransaction.save();

    res.status(201).json({
      message: "Transaction created successfully",
      error: false,
      success: true,
      data: saveTransaction,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
///////////////////////////////////////////////////////////////////
exports.getAllTransaction = async (req, res) => {
  try {
    const sessionUserId = req.user._id;
    const allTransactions = await Transaction.find({
      user: sessionUserId,
    }).sort({
      createdAt: -1,
    });

    res.json({
      message: "All transactions",
      success: true,
      error: false,
      data: allTransactions,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
///////////////////////////////////////////////////////////////////
exports.getTransaction = async (req, res) => {
  try {
    const sessionUserId = req.user._id;
    const transactionId = req.params.id;
    const transaction = await Transaction.find({
      user: sessionUserId,
      _id: transactionId,
    }).sort({
      createdAt: -1,
    });

    if (!transaction) throw new Error("Transaction not found");

    res.json({
      message: "Transaction",
      success: true,
      error: false,
      data: transaction,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
///////////////////////////////////////////////////////////////////
exports.transactionsByCategory = async (req, res) => {
  try {
    const sessionUserId = req.user._id;
    const allTransactions = await Transaction.find({
      user: sessionUserId,
    });

    const categoryMap = {};

    allTransactions.forEach((transaction) => {
      if (!categoryMap[transaction.category]) {
        categoryMap[transaction.category] = 0;
      }
      categoryMap[transaction.category] += transaction.amount;
    });

    const categories = Object.entries(categoryMap).map(
      ([category, totalAmount]) => ({
        category,
        totalAmount,
      })
    );

    res.json({
      message: "All transactions by category",
      success: true,
      error: false,
      data: categories,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
///////////////////////////////////////////////////////////////////
exports.updateTransaction = async (req, res) => {
  try {
    const updateTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      message: "Transaction updated successfully",
      data: updateTransaction,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
///////////////////////////////////////////////////////////////////
exports.deleteTransaction = async (req, res) => {
  try {
    const sessionUserId = req.user._id;
    const deleteTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );
    res.json({
      message: "Transaction deleted successfully",
      data: null,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
