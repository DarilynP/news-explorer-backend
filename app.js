import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";

dotenv.config();

const app = express();

// --- CORS middleware FIRST ---
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  })
);

// --- Body parser ---
app.use(express.json());

// // --- Test route for CORS ---
// app.get("/api/test", (req, res) => {
//   console.log("Test route hit");
//   res.json({ message: "CORS works!" });
// });

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

// --- MongoDB connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Start server ---
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

export default app;
