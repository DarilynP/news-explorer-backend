import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";

dotenv.config();

const app = express();

// --- CORS middleware ---
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"], // add "Authorization" if needed
    credentials: false, // set to false for now
  }));

app.use(express.json());

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

// --- MongoDB connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
 
export default app;