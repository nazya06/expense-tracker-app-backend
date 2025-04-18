import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Budget from "./Budget.js";
import Category from "./Category.js";

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CategoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id',
    }
  },
  BudgetId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Budgets', 
      key: 'id',
    }
  }
});

Transaction.belongsTo(Budget);
Transaction.belongsTo(Category, { foreignKey: 'CategoryId' });

export default Transaction;
