import fetch from "node-fetch";

export async function getNews(req, res) {
  const searchTerm = req.query.q || "general";
  const apiKey = process.env.NEWS_API_KEY;

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${searchTerm}&pageSize=10&apiKey=${apiKey}`
    );
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch news" });
    }
    const data = await response.json();
    res.json(data.articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
