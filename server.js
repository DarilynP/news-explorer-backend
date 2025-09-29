// server.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import newsRouter from "./routes/news.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// --- CORS middleware ---
app.use(
  cors({
    origin: "http://localhost:5173", // your React dev server
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/news", newsRouter);

app.get("/", (req, res) => {
  res.send("News API backend is running");
});

// --- Start server ---
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
