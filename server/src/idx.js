import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import websiteroutes from './routes/scrape.js';

dotenv.config();

const app = express();
app.use(cors({ origin: 'https://ai-web-scraper-seven.vercel.app/' }));
app.use(express.json());

// Test server
app.get('/', (req, res) => res.send('Server running 🚀'));

// API routes
app.use('/api', websiteroutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
