import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Budget = sequelize.define("Budget", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.UUID,
    allowNull: false
  }
  
});

User.hasMany(Budget);
Budget.belongsTo(User);

export default Budget;
