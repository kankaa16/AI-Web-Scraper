import axios from "axios";

const API_BASE = "http://localhost:5000";

export const scrapeWebsite = (url) =>
  axios.post(`${API_BASE}/api/scrape`, { url });
