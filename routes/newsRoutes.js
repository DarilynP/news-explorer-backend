import express from "express";
import { getNews } from "../utils/api.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing search query" });

  try {
    const articles = await getNews(q);
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

export default router;
