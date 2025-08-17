import { useState } from "react";
import {
  fetchWebsites,
  scrapeWebsite,
  updateWebsite,
  deleteWebsite,
} from "./api";
import "./App.css";

export default function App() {
  const [url, setUrl] = useState("");
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadHistory = async () => {
    setError("");
    try {
      const { data } = await fetchWebsites();
      setWebsites(data);
    } catch (err) {
      setError("Failed to fetch history");
    }
  };

  const handleScrape = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError("");
    try {
      const { data } = await scrapeWebsite(url);
      setWebsites((prev) => [data.inserted, ...prev]);
      setUrl("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to scrape URL");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWebsite(id);
      setWebsites((prev) => prev.filter((w) => w.id !== id));
    } catch {
      setError("Failed to delete");
    }
  };

  const handleUpdate = async (id) => {
  const newBrand = prompt("Enter new brand name:");
  const newDescription = prompt("Enter new description:");
  
  if (!newBrand && !newDescription) return; 

  try {
    const { data } = await updateWebsite(id, {
      brand: newBrand,
      description: newDescription
    });
    setWebsites((prev) =>
      prev.map((w) => (w.id === id ? data.updated : w))
    );
  } catch {
    setError("Failed to update");
  }
};


  return (
    <div className="app-container">
      <h1>Website Scraper</h1>

      <div className="form-container">
        <form onSubmit={handleScrape} className="form">
          <input
            type="url"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Scraping..." : "Scrape"}
          </button>
          <button
            type="button"
            className="history-btn"
            onClick={loadHistory}
          >
            Retrieve History
          </button>
        </form>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Brand</th>
              <th>URL</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {websites.map((site) => (
              <tr key={site.id}>
                <td>{site.brand}</td>
                <td>
                  <a href={site.url} target="_blank" rel="noopener noreferrer">
                    {site.url}
                  </a>
                </td>
                <td>{site.description}</td>
                <td>{new Date(site.created_at).toLocaleString()}</td>
                <td className="action-buttons">
  <button className="edit-btn" onClick={() => handleUpdate(site.id)}>Edit</button>
  <button className="delete-btn" onClick={() => handleDelete(site.id)}>Delete</button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
