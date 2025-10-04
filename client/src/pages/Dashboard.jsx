import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Users, 
  TrendingUp, 
  Globe,
  Calendar,
  Award,
  Zap,
  Target,
  Network
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { 
      icon: FileText, 
      value: '2,847', 
      label: 'Total Publications',
      change: '+12%',
      color: 'var(--primary-color)'
    },
    { 
      icon: Users, 
      value: '156', 
      label: 'Research Teams',
      change: '+8%',
      color: 'var(--success-color)'
    },
    { 
      icon: TrendingUp, 
      value: '89%', 
      label: 'Success Rate',
      change: '+3%',
      color: 'var(--warning-color)'
    },
    { 
      icon: Globe, 
      value: '42', 
      label: 'Countries',
      change: '+2',
      color: 'var(--accent-color)'
    }
  ];

  const recentPublications = [
    {
      id: 1,
      title: "Effects of Microgravity on Plant Growth Patterns",
      authors: ["Dr. Sarah Chen", "Dr. Michael Rodriguez"],
      journal: "Nature Space Biology",
      date: "2024-01-15",
      impact: "High",
      tags: ["Plant Biology", "Microgravity", "Growth Patterns"]
    },
    {
      id: 2,
      title: "Radiation Resistance in Bacterial Strains",
      authors: ["Dr. Elena Petrov", "Dr. James Wilson"],
      journal: "Astrobiology Journal",
      date: "2024-01-12",
      impact: "Medium",
      tags: ["Bacteria", "Radiation", "Resistance"]
    },
    {
      id: 3,
      title: "Human Immune System Response in Space",
      authors: ["Dr. Maria Santos", "Dr. David Kim"],
      journal: "Space Medicine Quarterly",
      date: "2024-01-10",
      impact: "High",
      tags: ["Human Biology", "Immune System", "Space Medicine"]
    }
  ];

  const topResearchAreas = [
    { name: "Plant Biology", count: 456, percentage: 32 },
    { name: "Human Physiology", count: 389, percentage: 27 },
    { name: "Microbiology", count: 312, percentage: 22 },
    { name: "Cell Biology", count: 267, percentage: 19 }
  ];

  return (
    <div className="dashboard">
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>NASA Bioscience Dashboard</h1>
        <p className="dashboard-subtitle">
          Explore decades of space biology research and discover insights for future missions
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="stats-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.label}
            className="stat-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="stat-icon" style={{ color: stat.color }}>
              <stat.icon size={32} />
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-change" style={{ color: stat.color }}>
              {stat.change}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="dashboard-content">
        {/* Recent Publications */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="card-header">
            <h2 className="card-title">Recent Publications</h2>
            <button className="btn btn-outline">View All</button>
          </div>
          
          <div className="publications-list">
            {recentPublications.map((pub, index) => (
              <motion.div 
                key={pub.id}
                className="publication-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="publication-content">
                  <h3 className="publication-title">{pub.title}</h3>
                  <p className="publication-authors">{pub.authors.join(', ')}</p>
                  <div className="publication-meta">
                    <span className="journal">{pub.journal}</span>
                    <span className="date">{pub.date}</span>
                    <span className={`impact impact-${pub.impact.toLowerCase()}`}>
                      {pub.impact} Impact
                    </span>
                  </div>
                  <div className="publication-tags">
                    {pub.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Research Areas */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="card-header">
            <h2 className="card-title">Top Research Areas</h2>
            <button className="btn btn-outline">Explore</button>
          </div>
          
          <div className="research-areas">
            {topResearchAreas.map((area, index) => (
              <motion.div 
                key={area.name}
                className="research-area-item"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                <div className="area-header">
                  <span className="area-name">{area.name}</span>
                  <span className="area-count">{area.count} publications</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${area.percentage}%` }}
                  ></div>
                </div>
                <div className="area-percentage">{area.percentage}%</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div 
        className="quick-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <motion.button 
            className="action-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap size={24} />
            <span>AI-Powered Search</span>
          </motion.button>
          
          <motion.button 
            className="action-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Network size={24} />
            <span>Explore Knowledge Graph</span>
          </motion.button>
          
          <motion.button 
            className="action-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Target size={24} />
            <span>Mission Planning</span>
          </motion.button>
          
          <motion.button 
            className="action-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar size={24} />
            <span>Experiment Timeline</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
