import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";   // <--- add this
import itemsRoutes from "./routes/items.js";
import usersRoutes from "./routes/users.js";
import connectDB from "./config/db.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
connectDB();

// Routes
app.use("/api/items", itemsRoutes);
app.use("/api/users", usersRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
