import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Replace with your own API key if needed
const NASA_API_KEY = 'GkUc4JHO3E7vLqZuF6DGdNOb0HPMzS0CUm6J50Ml';

app.use(cors());

/**
 * GET /api/publications
 * - Fetches all experiments
 * - Extracts canonical URLs like:
 *   https://osdr.nasa.gov/geode-py/ws/api/experiment/OS-53
 * - Validates that they work
 */
app.get('/api/publications', async (req, res) => {
  try {
    const listUrl = `https://osdr.nasa.gov/geode-py/ws/api/experiments?api_key=${NASA_API_KEY}`;
    const { data } = await axios.get(listUrl);

    const arr = data.data;
    if (!Array.isArray(arr)) return res.json({ data: [] });

    // Step 1: Extract and normalize experiment URLs
    const allLinks = arr.map(item => {
      const rawUrl = item.experiment || item.fields?.[0]?.experiment;
      if (!rawUrl) return null;

      const id = rawUrl.split('/').pop(); // e.g., OS-53
      if (!id || !id.startsWith('OS-')) return null;

      const canonicalUrl = `https://osdr.nasa.gov/geode-py/ws/api/experiment/${id}`;
      return { experiment: canonicalUrl };
    }).filter(Boolean);

    console.log(`🔍 Found ${allLinks.length} canonical experiment URLs. Validating...`);

    // Step 2: Optionally validate URLs (keep only working ones)
    const validatedLinks = await Promise.all(
      allLinks.map(async (linkObj) => {
        try {
          const testUrl = `${linkObj.experiment}?api_key=${NASA_API_KEY}`;
          const response = await axios.get(testUrl);
          return (response?.data && Object.keys(response.data).length > 0) ? linkObj : null;
        } catch {
          return null;
        }
      })
    );

    const validLinks = validatedLinks.filter(Boolean);
    console.log(`✅ ${validLinks.length} valid experiment links found`);

    res.json({ data: validLinks });

  } catch (error) {
    console.error('❌ Error in /api/publications:', error.message);
    res.status(500).json({ data: [] });
  }
});

/**
 * GET /api/exptdetail?url=https://osdr.nasa.gov/geode-py/ws/api/experiment/OS-53
 * Fetches detailed metadata for a specific experiment
 */
app.get('/api/exptdetail', async (req, res) => {
  const urlParam = req.query.url;
  if (!urlParam) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const connector = urlParam.includes('?') ? '&' : '?';
    const fullUrl = `${urlParam}${connector}api_key=${NASA_API_KEY}`;
    console.log(`🔍 Fetching details for: ${fullUrl}`);
    
    const { data } = await axios.get(fullUrl);

    if (!data || Object.keys(data).length === 0) {
      return res.status(404).json({ error: 'Experiment not found or empty' });
    }

    res.json(data);
  } catch (error) {
    console.error(`❌ Failed to fetch detail for ${urlParam}:`, error.message);
    const status = error.response?.status || 500;
    res.status(status).json({ error: 'Failed to fetch experiment details' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});