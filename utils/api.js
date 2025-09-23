import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// use env variable or fallback to hardcoded key
const API_KEY = process.env.NEWS_API_KEY || "c608435d13a646328c916afd1a913da9";

export async function getNews(search) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(search)}&apiKey=${API_KEY}`
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend fetch failed:", res.status, text);
      throw new Error(`News API request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data.articles || [];
  } catch (err) {
    console.error("Error in backend getNews:", err);
    throw err;
  }
}
