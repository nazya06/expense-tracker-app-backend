import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Budget from "./Budget.js";
import Category from "./Category.js";

const Transaction = sequelize.define('Transaction', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Allow categoryId to be null
    references: {
      model: 'Categories',
      key: 'id',
    }
  }
});

Transaction.belongsTo(Budget);
Transaction.belongsTo(Category);

export default Transaction;
