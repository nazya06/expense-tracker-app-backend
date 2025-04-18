import express from "express";
import { createBudget, getBudgets } from "../controllers/budgetController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { check } from "express-validator";
import { validateRequest } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("totalAmount")
      .isFloat({ gt: 0 })
      .withMessage("Total amount must be a positive number"),
  ],
  validateRequest,
  createBudget
);

router.get("/", authMiddleware, getBudgets);


export default router;
