import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve("/Users/darip/news-explorer-backend/.env"),
});
console.log("MONGO_URI =", process.env.MONGO_URI);

import express from "express";
import mongoose from "mongoose";

import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";

const app = express();
const mongoUri = process.env.MONGO_URI;
console.log("MONGO_URI =", process.env.MONGO_URI);

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

if (!mongoUri) {
  console.error("❌ MONGO_URI is not defined!");
  process.exit(1); // stop server
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Start server ---
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

export default app;
