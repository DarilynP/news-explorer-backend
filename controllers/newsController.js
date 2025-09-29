import fetch from "node-fetch";

export async function getNews(req, res) {
  const searchTerm = req.query.q || "general";
  const apiKey = process.env.NEWS_API_KEY;

  if (!searchTerm.trim()) {
    return res.status(400).json({ error: "Please enter a keyword" });
  }

  if (!apiKey) {
    return res.status(500).json({ error: "API key not found" });
  }

  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://nomoreparties.co/news/v2/everything"
        : "https://gnews.io/api/v4/search";

    const url = `${baseUrl}?q=${encodeURIComponent(
      searchTerm
    )}&max=10&lang=en&token=${apiKey}`;

    console.log("Fetching news URL:", url);

    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Status ${response.status}: ${response.statusText}`);

    const data = await response.json();
    res.json(data.articles || []);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Server error" });
  }
}
