import { Category } from "../models/index.js";
import sequelize from "../config/db.js"; // ✅ This works with default export


const seedCategories = async () => {
  try {
    await sequelize.sync(); // Ensure DB is connected
    await Category.bulkCreate([
      { name: "Food" },
      { name: "Transport" },
      { name: "Entertainment" },
      { name: "Utilities" },
    ]);
    console.log("✅ Categories seeded");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed categories:", error);
    process.exit(1);
  }
};

seedCategories();
