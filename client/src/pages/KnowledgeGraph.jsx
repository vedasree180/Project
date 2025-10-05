import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Network, 
  Search, 
  Filter, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

const KnowledgeGraph = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showLabels, setShowLabels] = useState(true);
  const canvasRef = useRef(null);

  // Sample knowledge graph data
  const graphData = {
    nodes: [
      { id: 'plant-biology', label: 'Plant Biology', type: 'domain', size: 80, x: 200, y: 150 },
      { id: 'microgravity', label: 'Microgravity', type: 'condition', size: 60, x: 100, y: 100 },
      { id: 'arabidopsis', label: 'Arabidopsis', type: 'organism', size: 50, x: 150, y: 200 },
      { id: 'growth-patterns', label: 'Growth Patterns', type: 'phenotype', size: 45, x: 250, y: 200 },
      { id: 'human-biology', label: 'Human Biology', type: 'domain', size: 75, x: 400, y: 150 },
      { id: 'immune-system', label: 'Immune System', type: 'system', size: 55, x: 350, y: 200 },
      { id: 'spaceflight', label: 'Spaceflight', type: 'condition', size: 60, x: 450, y: 100 },
      { id: 'radiation', label: 'Radiation', type: 'condition', size: 50, x: 500, y: 200 },
      { id: 'microbiology', label: 'Microbiology', type: 'domain', size: 70, x: 300, y: 300 },
      { id: 'bacteria', label: 'Bacteria', type: 'organism', size: 45, x: 250, y: 350 },
      { id: 'resistance', label: 'Radiation Resistance', type: 'phenotype', size: 50, x: 350, y: 350 },
      { id: 'cell-biology', label: 'Cell Biology', type: 'domain', size: 65, x: 200, y: 400 },
      { id: 'dna-damage', label: 'DNA Damage', type: 'phenotype', size: 45, x: 150, y: 450 },
      { id: 'repair-mechanisms', label: 'Repair Mechanisms', type: 'process', size: 50, x: 250, y: 450 }
    ],
    edges: [
      { source: 'plant-biology', target: 'microgravity', weight: 0.8 },
      { source: 'plant-biology', target: 'arabidopsis', weight: 0.9 },
      { source: 'arabidopsis', target: 'growth-patterns', weight: 0.7 },
      { source: 'microgravity', target: 'growth-patterns', weight: 0.6 },
      { source: 'human-biology', target: 'immune-system', weight: 0.8 },
      { source: 'human-biology', target: 'spaceflight', weight: 0.7 },
      { source: 'spaceflight', target: 'radiation', weight: 0.6 },
      { source: 'immune-system', target: 'spaceflight', weight: 0.5 },
      { source: 'microbiology', target: 'bacteria', weight: 0.9 },
      { source: 'bacteria', target: 'resistance', weight: 0.7 },
      { source: 'radiation', target: 'resistance', weight: 0.6 },
      { source: 'cell-biology', target: 'dna-damage', weight: 0.8 },
      { source: 'cell-biology', target: 'repair-mechanisms', weight: 0.7 },
      { source: 'dna-damage', target: 'repair-mechanisms', weight: 0.6 },
      { source: 'radiation', target: 'dna-damage', weight: 0.8 }
    ]
  };

  const nodeTypes = {
    domain: { color: '#0066cc', borderColor: '#00a8ff' },
    condition: { color: '#ff6b35', borderColor: '#ff8c5a' },
    organism: { color: '#00d4aa', borderColor: '#33e0c4' },
    phenotype: { color: '#ffb800', borderColor: '#ffcc33' },
    system: { color: '#ff4757', borderColor: '#ff6b7a' },
    process: { color: '#9c88ff', borderColor: '#b19cff' }
  };

  const filteredNodes = graphData.nodes.filter(node => 
    node.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const nodeDetails = {
    'plant-biology': {
      title: 'Plant Biology',
      description: 'Study of plant life in space environments',
      publications: 456,
      experiments: 89,
      keyFindings: [
        'Plants adapt to microgravity through altered growth patterns',
        'Root systems develop differently in space',
        'Photosynthesis efficiency changes in space conditions'
      ]
    },
    'microgravity': {
      title: 'Microgravity Effects',
      description: 'Biological responses to reduced gravity conditions',
      publications: 234,
      experiments: 67,
      keyFindings: [
        'Affects cellular structure and function',
        'Influences developmental processes',
        'Alters fluid dynamics in organisms'
      ]
    },
    'arabidopsis': {
      title: 'Arabidopsis thaliana',
      description: 'Model organism for space plant biology research',
      publications: 123,
      experiments: 45,
      keyFindings: [
        'Shows altered gene expression in space',
        'Develops modified root architecture',
        'Exhibits stress response adaptations'
      ]
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    graphData.edges.forEach(edge => {
      const sourceNode = graphData.nodes.find(n => n.id === edge.source);
      const targetNode = graphData.nodes.find(n => n.id === edge.target);
      
      if (sourceNode && targetNode) {
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${edge.weight * 0.5})`;
        ctx.lineWidth = edge.weight * 3;
        ctx.stroke();
      }
    });

    // Draw nodes
    filteredNodes.forEach(node => {
      const nodeType = nodeTypes[node.type];
      
      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size / 2, 0, 2 * Math.PI);
      ctx.fillStyle = nodeType.color;
      ctx.fill();
      ctx.strokeStyle = nodeType.borderColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Node label
      if (showLabels) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 4);
      }
    });
  }, [filteredNodes, showLabels]);

  return (
    <div className="knowledge-graph-page">
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Knowledge Graph Explorer</h1>
        <p>Visualize relationships between NASA bioscience research areas and discoveries</p>
      </motion.div>

      <div className="graph-container">
        {/* Controls */}
        <motion.div 
          className="graph-controls"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="search-section">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search nodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="control-buttons">
            <button 
              className="btn btn-secondary"
              onClick={() => setShowLabels(!showLabels)}
            >
              {showLabels ? <EyeOff size={16} /> : <Eye size={16} />}
              {showLabels ? 'Hide Labels' : 'Show Labels'}
            </button>
            
            <button className="btn btn-secondary">
              <ZoomIn size={16} />
            </button>
            
            <button className="btn btn-secondary">
              <ZoomOut size={16} />
            </button>
            
            <button className="btn btn-secondary">
              <RotateCcw size={16} />
            </button>
            
            <button className="btn btn-secondary">
              <Download size={16} />
            </button>
          </div>
        </motion.div>

        {/* Graph Canvas */}
        <motion.div 
          className="graph-canvas-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <canvas 
            ref={canvasRef}
            className="graph-canvas"
            onClick={(e) => {
              const rect = canvasRef.current.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              
              // Find clicked node
              const clickedNode = filteredNodes.find(node => {
                const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
                return distance <= node.size / 2;
              });
              
              setSelectedNode(clickedNode);
            }}
          />
        </motion.div>

        {/* Node Details Panel */}
        {selectedNode && (
          <motion.div 
            className="node-details-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="panel-header">
              <h3>{selectedNode.label}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedNode(null)}
              >
                ×
              </button>
            </div>
            
            {nodeDetails[selectedNode.id] && (
              <div className="panel-content">
                <p className="description">
                  {nodeDetails[selectedNode.id].description}
                </p>
                
                <div className="stats">
                  <div className="stat">
                    <span className="stat-label">Publications:</span>
                    <span className="stat-value">{nodeDetails[selectedNode.id].publications}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Experiments:</span>
                    <span className="stat-value">{nodeDetails[selectedNode.id].experiments}</span>
                  </div>
                </div>
                
                <div className="key-findings">
                  <h4>Key Findings:</h4>
                  <ul>
                    {nodeDetails[selectedNode.id].keyFindings.map((finding, index) => (
                      <li key={index}>{finding}</li>
                    ))}
                  </ul>
                </div>
                
                <button className="btn btn-primary">
                  Explore Related Research
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Legend */}
        <motion.div 
          className="graph-legend"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h4>Node Types</h4>
          <div className="legend-items">
            {Object.entries(nodeTypes).map(([type, style]) => (
              <div key={type} className="legend-item">
                <div 
                  className="legend-color" 
                  style={{ backgroundColor: style.color }}
                ></div>
                <span>{type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;