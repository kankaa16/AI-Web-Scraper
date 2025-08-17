import express from 'express';
import {
  scrapeWebsite,
  getWebsites,
  updateWebsite,
  deleteWebsite
} from '../controllers/scrape.js';

const router = express.Router();

router.post('/scrape', scrapeWebsite);
router.get('/', getWebsites);
router.put('/:id', updateWebsite);
router.delete('/:id', deleteWebsite);

export default router;
