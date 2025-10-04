import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Eye, Star, Calendar, User, FileText, Rocket } from 'lucide-react';

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const publications = [
    {
      id: 1,
      title: "Effects of Microgravity on Plant Growth Patterns in Arabidopsis thaliana",
      authors: ["Dr. Sarah Chen", "Dr. Michael Rodriguez", "Dr. Lisa Wang"],
      journal: "Nature Space Biology",
      date: "2024-01-15",
      impact: "High",
      citations: 45,
      abstract: "This study examines the morphological and physiological changes in Arabidopsis thaliana plants grown under microgravity conditions aboard the International Space Station...",
      tags: ["Plant Biology", "Microgravity", "Growth Patterns", "Arabidopsis"],
      doi: "10.1038/nspacebio.2024.001",
      mission: "ISS Expedition 68"
    },
    {
      id: 2,
      title: "Radiation Resistance Mechanisms in Extremophilic Bacterial Strains",
      authors: ["Dr. Elena Petrov", "Dr. James Wilson"],
      journal: "Astrobiology Journal",
      date: "2024-01-12",
      impact: "Medium",
      citations: 23,
      abstract: "Investigation of radiation resistance mechanisms in extremophilic bacteria isolated from space environments and their potential applications for space exploration...",
      tags: ["Bacteria", "Radiation", "Resistance", "Extremophiles"],
      doi: "10.1089/ast.2024.002",
      mission: "Mars Sample Return"
    },
    {
      id: 3,
      title: "Human Immune System Response to Extended Spaceflight",
      authors: ["Dr. Maria Santos", "Dr. David Kim", "Dr. Robert Taylor"],
      journal: "Space Medicine Quarterly",
      date: "2024-01-10",
      impact: "High",
      citations: 67,
      abstract: "Comprehensive analysis of immune system changes in astronauts during long-duration space missions and countermeasures for immune function preservation...",
      tags: ["Human Biology", "Immune System", "Space Medicine", "Long-duration"],
      doi: "10.1016/j.spacemed.2024.003",
      mission: "ISS Expedition 67"
    },
    {
      id: 4,
      title: "Cellular Response to Cosmic Radiation in Mammalian Cells",
      authors: ["Dr. Anna Kowalski", "Dr. Thomas Brown"],
      journal: "Radiation Research",
      date: "2024-01-08",
      impact: "Medium",
      citations: 34,
      abstract: "Study of cellular damage and repair mechanisms in mammalian cells exposed to cosmic radiation levels similar to those encountered during space travel...",
      tags: ["Cell Biology", "Radiation", "DNA Damage", "Repair Mechanisms"],
      doi: "10.1667/RR2024.004",
      mission: "Ground-based Simulation"
    },
    {
      id: 5,
      title: "Metabolic Changes in Microorganisms Under Space Conditions",
      authors: ["Dr. Jennifer Lee", "Dr. Carlos Mendez"],
      journal: "Applied Microbiology",
      date: "2024-01-05",
      impact: "Medium",
      citations: 28,
      abstract: "Analysis of metabolic pathway alterations in various microorganisms when exposed to space environment conditions including microgravity and radiation...",
      tags: ["Microbiology", "Metabolism", "Space Environment", "Pathways"],
      doi: "10.1128/AEM.2024.005",
      mission: "ISS Expedition 66"
    }
  ];

  const filters = [
    { value: 'all', label: 'All Publications' },
    { value: 'high-impact', label: 'High Impact' },
    { value: 'recent', label: 'Recent (2024)' },
    { value: 'plant-biology', label: 'Plant Biology' },
    { value: 'human-biology', label: 'Human Biology' },
    { value: 'microbiology', label: 'Microbiology' }
  ];

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         pub.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                          (selectedFilter === 'high-impact' && pub.impact === 'High') ||
                          (selectedFilter === 'recent' && pub.date.startsWith('2024')) ||
                          (selectedFilter === 'plant-biology' && pub.tags.includes('Plant Biology')) ||
                          (selectedFilter === 'human-biology' && pub.tags.includes('Human Biology')) ||
                          (selectedFilter === 'microbiology' && pub.tags.includes('Microbiology'));
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="publications-page">
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>NASA Bioscience Publications</h1>
        <p>Explore decades of space biology research and discoveries</p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div 
        className="search-filter-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="search-bar">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search publications, authors, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-section">
          <Filter size={20} />
          <select 
            value={selectedFilter} 
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="filter-select"
          >
            {filters.map(filter => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div 
        className="results-count"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <span>{filteredPublications.length} publications found</span>
      </motion.div>

      {/* Publications List */}
      <div className="publications-list">
        {filteredPublications.map((pub, index) => (
          <motion.div 
            key={pub.id}
            className="publication-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="publication-header">
              <div className="publication-title-section">
                <h2 className="publication-title">{pub.title}</h2>
                <div className="publication-meta">
                  <span className="journal">
                    <FileText size={16} />
                    {pub.journal}
                  </span>
                  <span className="date">
                    <Calendar size={16} />
                    {pub.date}
                  </span>
                  <span className="mission">
                    <Rocket size={16} />
                    {pub.mission}
                  </span>
                </div>
              </div>
              
              <div className="publication-actions">
                <button className="btn btn-outline">
                  <Eye size={16} />
                  View
                </button>
                <button className="btn btn-outline">
                  <Download size={16} />
                  Download
                </button>
                <button className="btn btn-outline">
                  <Star size={16} />
                  Cite
                </button>
              </div>
            </div>

            <div className="publication-content">
              <div className="authors">
                <User size={16} />
                <span>{pub.authors.join(', ')}</span>
              </div>
              
              <div className="abstract">
                <p>{pub.abstract}</p>
              </div>
              
              <div className="publication-stats">
                <div className="stat">
                  <span className="stat-label">Citations:</span>
                  <span className="stat-value">{pub.citations}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Impact:</span>
                  <span className={`impact-badge impact-${pub.impact.toLowerCase()}`}>
                    {pub.impact}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">DOI:</span>
                  <span className="doi">{pub.doi}</span>
                </div>
              </div>
              
              <div className="tags">
                {pub.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <motion.div 
        className="load-more-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <button className="btn btn-primary">
          Load More Publications
        </button>
      </motion.div>
    </div>
  );
};

export default Publications;
