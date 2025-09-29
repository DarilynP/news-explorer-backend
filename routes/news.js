// routes/news.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.q || "general";

  if (!process.env.NEWS_API_KEY) {
    return res.status(500).json({ error: "API key not found" });
  }

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
    query
  )}&token=${process.env.NEWS_API_KEY}&lang=en&max=10`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: response.statusText });
    }

    const data = await response.json();
    res.json(data.articles); // send only articles to frontend
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

export default router;
