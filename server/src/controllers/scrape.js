import axios from "axios";
import * as cheerio from "cheerio";
import OpenAI from "openai";

const isValidUrl=(url)=>{
  try{
    new URL(url);
    return true;
  } catch{
    return false;
  }
};

let openai=null;

if(process.env.OPEN_API_KEY) {
  openai=new OpenAI({
    apiKey:process.env.OPEN_API_KEY,
  });
}

async function enhanceDescription(rawText) {
  if(!openai) return rawText;

  try{
    const res=await openai.chat.completions.create({
      model:"gpt-4o-mini",
      messages:[
        {
          role:"system",
          content:
            "You summarize websites. Return a 1-2 sentence neutral description. No marketing fluff."
        },
        {
          role:"user",
          content:rawText
        }
      ],
    });

    return res.choices[0].message.content.trim();
  } catch {
    return rawText;
  }
}


export const scrapeWebsite=async(req,res)=>{
  const {url}=req.body;

  if(!url||!isValidUrl(url)){
    return res.status(400).json({ error: "Valid URL required"});
  }

  try{
    const response=await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120",
      },
      timeout:15000,
    });

    const $=cheerio.load(response.data);

    const brand=$('meta[property="og:site_name"]').attr("content")||$("title").text().trim() ||"Unknown";

    let description=$('meta[name="description"]').attr("content")||$('meta[property="og:description"]').attr("content")||$("p").first().text();

    if(!description||description.length<20) {
      description="No meaningful description found";
    }

    description=await enhanceDescription(description);

    res.json({
      url,
      brand,
      description,
      scrapedAt:new Date(),
    });
  } catch(err){
    console.error(err.message);
    res.status(500).json({ error:"Scraping failed" });
  }
};
