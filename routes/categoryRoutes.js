import express from "express";
import {
  createCategory,
  getCategories,
  getCategoriesByBudget
} from "../controllers/categoryController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { check } from "express-validator";
import { validateRequest } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  [check("name").notEmpty().withMessage("Category name is required")],
  validateRequest,
  createCategory
);

router.get("/", authMiddleware, getCategories);
router.get("/:budgetId", authMiddleware, getCategoriesByBudget);


export default router;
