import Transaction from "../models/Transaction.js";
import { Op } from "sequelize";

export const getTransactions = async (req, res) => {
  const { budgetId } = req.params;
  const {
    categoryId,
    dateFrom,
    dateTo,
    sortBy = "createdAt",
    order = "DESC",
  } = req.query;

  try {
    const where = { BudgetId: budgetId };

    if (categoryId) where.CategoryId = categoryId;
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt[Op.gte] = new Date(dateFrom);
      if (dateTo) where.createdAt[Op.lte] = new Date(dateTo);
    }

    const transactions = await Transaction.findAll({
      where,
      order: [[sortBy, order]],
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching transactions", err });
  }
};

export const createTransaction = async (req, res) => {
  const { amount, description, categoryId } = req.body; // Destructure the request body

  try {
    // Create a new transaction, set categoryId to null if it's not provided
    const transaction = await Transaction.create({
      amount,
      description,
      categoryId: categoryId || null, // Allow category to be null
    });

    // Return the newly created transaction in the response
    res.status(201).json(transaction);
  } catch (error) {
    // Handle any errors that occur during the transaction creation
    res.status(500).json({ message: "Server error", error });
  }
};