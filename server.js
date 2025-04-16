import express from "express";
import cors from "cors";  // Import CORS
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import { errorHandler } from "./middlewares/erorrHandler.js";

const app = express();

// Enable CORS for all origins (you can restrict it to localhost:3000 later)
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Your other middlewares and routes
app.use(errorHandler);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

// Connect to the database
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to PostgreSQL");

    return sequelize.sync();
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(" DB connection error:", err));
