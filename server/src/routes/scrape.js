import express from 'express';
import {
  scrapeWebsite,
} from '../controllers/scrape.js';

const router = express.Router();

router.post('/scrape', scrapeWebsite);


export default router;
