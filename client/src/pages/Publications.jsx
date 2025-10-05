import React, { useState, useEffect } from 'react';
import '../publications.css';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Search, Filter, Eye, Star, Calendar,
  User, FileText, Rocket, Download, ChevronLeft, ChevronRight
} from 'lucide-react';

const ITEMS_PER_PAGE = 20;

function mapExperimentToCard(exp) {
  const obj = exp.fields?.[0] || exp;

  const title = obj.title || 'Untitled Publication';
  const journal = obj.publications?.[0]?.title || 'Nature Space Biology';
  const date = obj.releaseDate || '';
  const mission = obj.missions?.[0]?.identifier || (obj.payloads && obj.payloads[0]?.payloadName) || 'NASA Mission';

  // Only first 2-3 people
  const authors = (obj.people || [])
    .slice(0, 3)
    .map(p => {
      const per = p.person || p;
      const role = (p.roles && p.roles[0] && p.roles[0].annotationValue) || '';
      return [
        per.firstName, per.middleName, per.lastName
      ].filter(Boolean).join(' ') + (role ? ` (${role})` : '');
    });

  // The abstract area is always payload[0].description if available
  const description =
    (obj.payloads && obj.payloads[0] && obj.payloads[0].description)
    || obj.description
    || obj.objectives
    || obj.approach
    || obj.results
    || 'No description available.';

  return {
    id: obj.id || obj.osID || Math.random(),
    title,
    journal,
    date,
    mission,
    authors,
    description
  };
}

const Publications = () => {
  const [experimentLinks, setExperimentLinks] = useState([]);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3001/api/publications')
      .then(res => {
        setExperimentLinks(res.data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setExperimentLinks([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchPage = async () => {
      if (experimentLinks.length === 0) return;
      setLoading(true);
      const startIdx = currentPage * ITEMS_PER_PAGE;
      const links = experimentLinks.slice(startIdx, startIdx + ITEMS_PER_PAGE);
      const detailPromises = links.map(async (link) => {
        try {
          const res = await axios.get(`http://localhost:3001/api/exptdetail?url=${encodeURIComponent(link.experiment)}`);
          return mapExperimentToCard(res.data);
        } catch {
          return null;
        }
      });
      const cards = (await Promise.all(detailPromises)).filter(Boolean);
      setPublications(cards);
      setLoading(false);
    };
    fetchPage();
  }, [experimentLinks, currentPage]);

  const filteredPublications = publications.filter(pub => {
    const matchSearch = !searchTerm
      || pub.title.toLowerCase().includes(searchTerm.toLowerCase())
      || pub.authors.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchSearch;
  });

  const totalPages = Math.ceil(experimentLinks.length / ITEMS_PER_PAGE);

  return (
    <div className="publications-page">
      <motion.div className="page-header"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1>NASA Bioscience Publications</h1>
        <p>Explore decades of space biology research and discoveries</p>
      </motion.div>
      <motion.div className="search-filter-section"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <div className="search-bar">
          <Search size={20} />
          <input type="text" placeholder="Search publications, authors, or topics..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="search-input" />
        </div>
        <div className="filter-section">
          <Filter size={20} />
          <select value={selectedFilter} onChange={e => setSelectedFilter(e.target.value)} className="filter-select">
            <option value="all">All Publications</option>
            <option value="high-impact">High Impact</option>
          </select>
        </div>
      </motion.div>
      <motion.div className="results-count"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.4 }}>
        {loading
          ? <span>Loading publications...</span>
          : <span>{filteredPublications.length} publications found on this page</span>}
      </motion.div>
      <div className="publications-list">
        {!loading && filteredPublications.map((pub, idx) => (
          <motion.div key={pub.id} className="publication-card"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }} whileHover={{ scale: 1.02 }}>

            {/* Title & Action Buttons */}
            <div className="publication-header">
              <h2 className="publication-title">{pub.title}</h2>
              <div className="publication-actions">
                <button className="btn btn-outline"><Eye size={16}/> View</button>
                <button className="btn btn-outline"><Download size={16}/> Download</button>
                <button className="btn btn-outline"><Star size={16}/> Cite</button>
              </div>
            </div>
            {/* Top Metadata */}
            <div style={{ display: "flex", gap: "1rem", margin: "0.5rem 0" }}>
              <span className="journal"><FileText size={14}/>{pub.journal}</span>
              <span className="mission"><Rocket size={14}/>{pub.mission}</span>
            </div>
            {/* Authors + Description */}
            <div style={{ margin: "0.7rem 0" }}>
              <div className="authors"><User size={16} />{pub.authors.join(', ')}</div>
              <div className="abstract description-clamp">{pub.description}</div>
            </div>
            {/* Stat Row - Only date shown, styled */}
            <div style={{ display: "flex", alignItems: "center", gap: "2rem", margin: "1rem 0" }}>
              <div>
                <span style={{ fontWeight: "bold" }}>DATE:</span>
                <span style={{ fontSize: "2rem", fontWeight: "bold", marginLeft: "10px" }}>{pub.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
        {!loading && filteredPublications.length === 0 && (
          <div className="no-results"><p>No publications found.</p></div>
        )}
      </div>
      {/* Pagination */}
      <motion.div className="pagination-controls"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.8 }}>
        <button className="btn btn-outline"
          onClick={() => setCurrentPage(p => p - 1)}
          disabled={currentPage === 0}>
          <ChevronLeft size={18}/> Previous
        </button>
        <span style={{ margin: '0 1rem' }}>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button className="btn btn-outline"
          onClick={() => setCurrentPage(p => p + 1)}
          disabled={currentPage >= totalPages - 1}>
          Next <ChevronRight size={18}/>
        </button>
      </motion.div>
    </div>
  );
};

export default Publications;
