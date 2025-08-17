import axios from "axios";

const API_BASE = "https://ai-web-scraperr-vbtd.onrender.com";

export const fetchWebsites = () => axios.get(`${API_BASE}/api`);
export const scrapeWebsite = (url) => axios.post(`${API_BASE}/api/scrape`, { url });
export const updateWebsite = (id, updatedData) => axios.put(`${API_BASE}/api/${id}`, updatedData);
export const deleteWebsite = (id) => axios.delete(`${API_BASE}/api/${id}`);
