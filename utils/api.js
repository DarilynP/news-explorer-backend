import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// use env variable or fallback to hardcoded key
const API_KEY = process.env.NEWS_API_KEY || "1f5cfeb716eed7982784c2297d6455a7";
console.log("Using API_KEY:", API_KEY);

export async function getNews(search) {
  try {
    const res = await fetch(
      `https://nomoreparties.co/news/v2/everything?q=${encodeURIComponent(
        search
      )}&apiKey=${API_KEY}`
    );

    if (!res.ok) {
      const text = await res.text();

      console.error("Backend fetch failed:", res.status, text);
      throw new Error(`News API request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data.articles || [];
  } catch (err) {
    console.error("Error in backend getNews:", err);
    throw err;
  }
}
