import express from "express";
import { getTransactions } from "../controllers/transactionController.js";
import { getTransactionList } from "../controllers/transactionController.js";
import { createTransaction } from '../controllers/transactionController.js'; // Import the controller
import { authMiddleware } from '../middlewares/authMiddleware.js'; // Protect the route with authentication

const router = express.Router();

// Пример: /api/transactions/:budgetId?categoryId=...&dateFrom=...&sortBy=...
router.get("/:budgetId", authMiddleware, getTransactions);
router.post("/", authMiddleware, createTransaction);
router.get("", authMiddleware, getTransactionList);

export default router;
