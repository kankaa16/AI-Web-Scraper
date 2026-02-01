import {useState} from "react";
import {scrapeWebsite} from "./api.js";
import "./App.css";

export default function App() {
  const [url, setUrl]=useState("");
  const [websites, setWebsites]=useState([]);
  const [loading, setLoading]=useState(false);
  const [error, setError]=useState("");

  const handleScrape=async(e)=>{
    e.preventDefault();
    if(!url) return;

    setLoading(true);
    setError("");

    try {
      const {data}=await scrapeWebsite(url);

      // data = { url, brand, description, scrapedAt }
      setWebsites((prev) => [data, ...prev]);
      setUrl("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to scrape URL");
    } finally {
      setLoading(false);
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
        </form>
      </div>

      {error && <p className="error">{error}</p>}

      {websites.length > 0 && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Brand</th>
                <th>URL</th>
                <th>Description</th>
                <th>Scraped At</th>
              </tr>
            </thead>
            <tbody>
              {websites.map((site, index) => (
                <tr key={index}>
                  <td>{site.brand}</td>
                  <td>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {site.url}
                    </a>
                  </td>
                  <td>{site.description}</td>
                  <td>{new Date(site.scrapedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
