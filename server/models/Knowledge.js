// server/models/Knowledge.js
const db = require('../db');

module.exports = {
  // Return all nodes and links as a graph JSON (for demo if DB missing)
  getGraph: (cb) => {
    // If your DB has tables 'nodes' and 'links', adapt these queries.
    // Fallback: build a small default dataset.
    const nodesQuery = `SELECT id, label, groupname as "group", description FROM nodes`;
    const linksQuery = `SELECT source, target, label FROM links`;

    db.all(nodesQuery, [], (err, nodes) => {
      if (err) {
        // fallback dataset
        const graph = {
          nodes: [
            { id: 'Space Biology', label: 'Space Biology', group: 'Domain', description: '...' },
            { id: 'Plant Biology', label: 'Plant Biology', group: 'Domain', description: '...' },
            { id: 'Microgravity', label: 'Microgravity', group: 'Condition', description: '...' },
          ],
          links: [
            { source: 'Space Biology', target: 'Plant Biology', label: 'includes' },
            { source: 'Plant Biology', target: 'Microgravity', label: 'studies' }
          ]
        };
        return cb(null, graph);
      }
      db.all(linksQuery, [], (err2, links) => {
        if (err2) return cb(err2);
        // Ensure IDs are strings
        nodes = nodes.map(n => ({ id: String(n.id), label: n.label || n.id, group: n.group || 'unknown', description: n.description || '' }));
        links = links.map(l => ({ source: String(l.source), target: String(l.target), label: l.label || '' }));
        cb(null, { nodes, links });
      });
    });
  },

  getNodeById: (id, cb) => {
    const q = `SELECT id, label, groupname as "group", description FROM nodes WHERE id = ? LIMIT 1`;
    db.get(q, [id], (err, row) => {
      if (err) return cb(err);
      cb(null, row);
    });
  },

  searchNodes: (term, cb) => {
    const like = `%${term}%`;
    const q = `SELECT id, label, groupname as "group", description
               FROM nodes
               WHERE LOWER(label) LIKE LOWER(?) OR LOWER(groupname) LIKE LOWER(?) OR LOWER(id) LIKE LOWER(?)
               LIMIT 50`;
    db.all(q, [like, like, like], (err, rows) => {
      if (err) return cb(err);
      cb(null, rows);
    });
  },

  // n-hop neighbor BFS
  neighborhood: (startId, hops, cb) => {
    // Load all nodes and links in memory first (works for medium DBs)
    const nq = `SELECT id, label, groupname as "group", description FROM nodes`;
    const lq = `SELECT source, target, label FROM links`;
    db.all(nq, [], (err, nodes) => {
      if (err) return cb(err);
      db.all(lq, [], (err2, links) => {
        if (err2) return cb(err2);
        const adj = new Map();
        links.forEach(l => {
          adj.set(String(l.source), (adj.get(String(l.source)) || new Set()).add(String(l.target)));
          adj.set(String(l.target), (adj.get(String(l.target)) || new Set()).add(String(l.source)));
        });
        const visited = new Set([String(startId)]);
        let frontier = [String(startId)];
        for (let i = 0; i < hops; i++) {
          const next = [];
          frontier.forEach(v => {
            (adj.get(v) ? Array.from(adj.get(v)) : []).forEach(nb => {
              if (!visited.has(nb)) { visited.add(nb); next.push(nb); }
            });
          });
          frontier = next;
        }
        const nodesMap = new Map(nodes.map(n => [String(n.id), n]));
        const outNodes = Array.from(visited).map(id => nodesMap.get(id)).filter(Boolean);
        const outLinks = links.filter(l => visited.has(String(l.source)) && visited.has(String(l.target)));
        cb(null, { nodes: outNodes, links: outLinks });
      });
    });
  }
};
