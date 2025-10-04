const express = require('express');
const axios = require('axios');
const OpenAI = require('openai'); // updated import

const router = express.Router();

// ✅ Initialize OpenAI client with apiKey directly
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.get('/', async (req, res) => {
  try {
    const topic = req.query.topic;
    // Fetch PubMed data
    const pubmedRes = await axios.get(`https://api.ncbi.nlm.nih.gov/lit/ctxp/v1/pubmed/?format=abstract&term=${encodeURIComponent(topic)}`);
    const text = pubmedRes.data;

    // Summarize with OpenAI
    const summary = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: `Summarize the following: ${text}` }]
    });

    res.json({ summary: summary.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
