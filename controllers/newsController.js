import fetch from "node-fetch";

export async function getNews(req, res) {
  const searchTerm = req.query.q || "general";
  const apiKey = process.env.NEWS_API_KEY;

  console.log("Received search term:", searchTerm);
  console.log("Using API key:", apiKey);
  console.log("NEWS_API_KEY:", process.env.NEWS_API_KEY);


  try {
    const url = `https://nomoreparties.co/news/v2/everything?q=${encodeURIComponent(searchTerm)}&pageSize=10&apiKey=${apiKey}`;
    console.log("Fetching URL:", url);

    const response = await fetch(url);
    console.log("NewsAPI response status:", response.status);

    const data = await response.json();
    console.log("Fetched articles count:", data.articles.length);

    res.json(data.articles);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Server error" });
  }
}
