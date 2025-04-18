import Budget from "../models/Budget.js";

export const createBudget = async (req, res) => {
  const { name, totalAmount } = req.body;
  try {
    const budget = await Budget.create({
      name,
      totalAmount,
      UserId: req.user.id,
    });
    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: "Failed to create budget", err });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.findAll({ where: { UserId: req.user.id } });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: "Error fetching budgets", err });
  }
};

