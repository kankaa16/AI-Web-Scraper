import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const fetchWebsites = () => axios.get(`${API_BASE}/`);
export const scrapeWebsite = (url) => axios.post(`${API_BASE}/scrape`, { url });
export const updateWebsite = (id, updatedData) => axios.put(`${API_BASE}/${id}`, updatedData);
export const deleteWebsite = (id) => axios.delete(`${API_BASE}/${id}`);
