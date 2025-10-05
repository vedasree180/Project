// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/publications', async (req, res) => {
  try {
    const apiKey = 'GkUc4JHO3E7vLqZuF6DGdNOb0HPMzS0CUm6J50Ml';
    const url = `https://osdr.nasa.gov/geode-py/ws/api/experiments?api_key=${apiKey}`;

    const { data } = await axios.get(url);

    // console.log('NASA API Response:', data); // For debugging

    res.json(data);
  } catch (error) {
    console.error('Error fetching publications:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to fetch publications' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});