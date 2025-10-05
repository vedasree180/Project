// server/routes/knowledge.js
import express from 'express';
import Knowledge from '../models/Knowledge';

const router = express.Router();

// GET /api/knowledge/graph
router.get('/graph', async (req, res) => {
  try {
    const graph = await Knowledge.getGraph();
    res.json(graph);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load graph', details: err.message });
  }
});

// GET /api/knowledge/node/:id
router.get('/node/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const node = await Knowledge.getNodeById(id);
    if (!node) return res.status(404).json({ error: 'Node not found' });
    
    // also compute 1-hop neighbors and links (simple)
    const graph = await Knowledge.neighborhood(id, 1);
    res.json({ node, neighbors: graph.nodes.filter(n => String(n.id) !== String(id)), links: graph.links });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/knowledge/search?q=term
router.get('/search', async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.json({ results: [] });

  try {
    const rows = await Knowledge.searchNodes(q);
    res.json({ results: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/knowledge/neighborhood/:id?hops=2
router.get('/neighborhood/:id', async (req, res) => {
  const { id } = req.params;
  const hops = parseInt(req.query.hops || '1', 10);

  try {
    const graph = await Knowledge.neighborhood(id, hops);
    res.json(graph);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
