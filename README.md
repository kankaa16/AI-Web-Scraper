# 🤖 AI Website Scraper

A **full-stack web app** to scrape websites, extract metadata, and optionally enhance descriptions using AI.

# Live link 🔗 : https://ai-web-scraper-seven.vercel.app/

## ✨ Features

- 🌐 Scrape websites for **brand**, **URL**, and **description**  
- 📝 Optional AI-enhanced description for **better readability**  
- 💾 Save and retrieve history from **Supabase**  
- ✏️ Edit brand and description  
- 🗑️ Delete saved websites  
- 📱 Responsive UI with **React + Vite**  

## 📁 Folder Structure

| **Folder / File**     | **Description**                     |
|----------------------|-------------------------------------|
| 📦 `webscraper/`        | Root project folder                 |
| ├─ 💻 `client/`         | React + Vite frontend               |
| ├─ 🖥️ `server/`         | Node.js + Express backend           |
| │  └─ 📂 `src/`         | Source files for backend            |
| │     └─ 📄 `idx.js`    | Main entry point for server         |
| ├─ 📝 `README.md`       | Project documentation               |
| ├─ 🚫 `.gitignore`      | Files/folders to ignore in Git      |


## ⚙️ Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/kankaa16/AI-Web-Scraper.git
cd AI-Web-Scraper
```
### 2️⃣ Backend
cd server
npm install

Create a .env file

OPENAI_API_KEY=your_openai_api_key
databaseUrl=your connection string
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
PORT=5000

###3️⃣ Frontend
cd client
npm install
npm run dev

🔗 Update api.js to point to your deployed backend URL instead of localhost

🌐 Open the frontend URL provided by Vite (usually http://localhost:5173)



🛠️ API Endpoints
| **Method** | **Endpoint**           | **Description**                                           |
|------------|-----------------------|-----------------------------------------------------------|
| ✏️ **POST**   | `/api/scrape`         | Scrape a website and extract brand, URL, and description |
| 📄 **GET**    | `/api/websites`       | Retrieve all saved websites                                |
| 🔄 **PUT**    | `/api/websites/:id`   | Update the brand or description of a saved website        |
| 🗑️ **DELETE** | `/api/websites/:id`   | Delete a saved website                                     |


