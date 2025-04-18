import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name });
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

export const getCategoriesByBudget = async (req, res) => {
  const { budgetId } = req.params;
  try {
    const categories = await Category.findAll({ where: { BudgetId: budgetId } });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to get categories", err });
  }
};