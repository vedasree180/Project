// server/routes/knowledge.js
const express = require('express');
const router = express.Router();
const Knowledge = require('../models/Knowledge');

// GET /api/knowledge/graph
router.get('/graph', (req, res) => {
  Knowledge.getGraph((err, graph) => {
    if (err) return res.status(500).json({ error: 'Failed to load graph', details: err.message });
    res.json(graph);
  });
});

// GET /api/knowledge/node/:id
router.get('/node/:id', (req, res) => {
  const id = req.params.id;
  Knowledge.getNodeById(id, (err, node) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!node) return res.status(404).json({ error: 'Node not found' });
    // also compute 1-hop neighbors and links (simple)
    Knowledge.neighborhood(id, 1, (err2, graph) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ node, neighbors: graph.nodes.filter(n => String(n.id) !== String(id)), links: graph.links });
    });
  });
});

// GET /api/knowledge/search?q=term
router.get('/search', (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.json({ results: [] });
  Knowledge.searchNodes(q, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ results: rows });
  });
});

// GET /api/knowledge/neighborhood/:id?hops=2
router.get('/neighborhood/:id', (req, res) => {
  const id = req.params.id;
  const hops = parseInt(req.query.hops || '1', 10);
  Knowledge.neighborhood(id, hops, (err, graph) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(graph);
  });
});

module.exports = router;
