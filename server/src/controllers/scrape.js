import axios from 'axios';
import * as cheerio from 'cheerio';
import { supabase } from '../db.js';
import OpenAI from "openai";
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY
});

export async function enhanceDescription(description) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `Improve this website description for clarity and readability: ${description}` }
      ]
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("OpenAI error:", err);
    return description; // added fallbacks to original description, as it didnt handled edge cases!!
  }
}
//scraping site!
export const scrapeWebsite = async (req, res) => {
  const { url } = req.body;
  if (!url || !isValidUrl(url)) return res.status(400).json({ error: 'Valid URL is required' });

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(data);
    const brand = $('meta[property="og:site_name"]').attr('content') || $('title').text();
    let description = $('meta[name="description"]').attr('content') 
    || $('p').first().text() 
    || 'No description available';
    description = await enhanceDescription(description);

    const { data: inserted, error } = await supabase
      .from('websites')
      .insert([{ url, brand, description }])
      .select();

    if (error) throw error;

    res.json({ inserted: inserted[0] });
  } catch (err) {
    console.error('Scrape error:', err.message || err);
    res.status(500).json({ error: err.message || 'Scraping failed' });
  }
};
//fetching all records:!
export const getWebsites = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Fetch error:', err.message || err);
    res.status(500).json({ error: err.message || 'Failed to fetch websites' });
  }
};
//updating desc or name of site!
export const updateWebsite = async (req, res) => {
  const { id } = req.params;
  const { brand, description } = req.body;
  try {
    const { data, error } = await supabase
      .from('websites')
      .update({ brand, description })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json({ updated: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Update failed' });
  }
};

export const deleteWebsite = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase.from('websites').delete().eq('id', id);
    if (error) throw error;
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Delete failed' });
  }
};
