import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Filter,
  Download,
  Eye,
  Users,
  FileText,
  Award,
  Globe,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1y');
  const [selectedMetric, setSelectedMetric] = useState('publications');

  // Sample data
  const publicationTrends = [
    { month: 'Jan', publications: 45, citations: 234, impact: 8.2 },
    { month: 'Feb', publications: 52, citations: 267, impact: 8.5 },
    { month: 'Mar', publications: 48, citations: 289, impact: 8.7 },
    { month: 'Apr', publications: 61, citations: 312, impact: 8.9 },
    { month: 'May', publications: 55, citations: 298, impact: 8.6 },
    { month: 'Jun', publications: 67, citations: 345, impact: 9.1 },
    { month: 'Jul', publications: 59, citations: 321, impact: 8.8 },
    { month: 'Aug', publications: 63, citations: 356, impact: 9.2 },
    { month: 'Sep', publications: 58, citations: 334, impact: 8.9 },
    { month: 'Oct', publications: 71, citations: 378, impact: 9.4 },
    { month: 'Nov', publications: 65, citations: 362, impact: 9.1 },
    { month: 'Dec', publications: 69, citations: 389, impact: 9.3 }
  ];

  const researchAreas = [
    { name: 'Plant Biology', value: 32, count: 456, color: '#0066cc' },
    { name: 'Human Physiology', value: 27, count: 389, color: '#00d4aa' },
    { name: 'Microbiology', value: 22, count: 312, color: '#ff6b35' },
    { name: 'Cell Biology', value: 19, count: 267, color: '#ffb800' }
  ];

  const topAuthors = [
    { name: 'Dr. Sarah Chen', publications: 23, citations: 1245, hIndex: 18 },
    { name: 'Dr. Michael Rodriguez', publications: 21, citations: 1189, hIndex: 17 },
    { name: 'Dr. Elena Petrov', publications: 19, citations: 1098, hIndex: 16 },
    { name: 'Dr. James Wilson', publications: 18, citations: 1056, hIndex: 15 },
    { name: 'Dr. Maria Santos', publications: 17, citations: 987, hIndex: 14 }
  ];

  const missionData = [
    { mission: 'ISS Expedition 68', experiments: 12, publications: 8, success: 92 },
    { mission: 'Mars Sample Return', experiments: 8, publications: 6, success: 88 },
    { mission: 'ISS Expedition 67', experiments: 15, publications: 11, success: 95 },
    { mission: 'Artemis Program', experiments: 6, publications: 4, success: 85 },
    { mission: 'ISS Expedition 66', experiments: 10, publications: 7, success: 90 }
  ];

  const collaborationData = [
    { country: 'United States', collaborations: 45, publications: 234 },
    { country: 'Germany', collaborations: 23, publications: 156 },
    { country: 'Japan', collaborations: 19, publications: 134 },
    { country: 'Canada', collaborations: 16, publications: 98 },
    { country: 'Italy', collaborations: 14, publications: 87 },
    { country: 'France', collaborations: 12, publications: 76 }
  ];

  const keyMetrics = [
    {
      title: 'Total Publications',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'var(--primary-color)'
    },
    {
      title: 'Active Researchers',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'var(--success-color)'
    },
    {
      title: 'Average Impact Score',
      value: '8.9',
      change: '+3%',
      trend: 'up',
      icon: Award,
      color: 'var(--warning-color)'
    },
    {
      title: 'International Collaborations',
      value: '156',
      change: '+15%',
      trend: 'up',
      icon: Globe,
      color: 'var(--accent-color)'
    }
  ];

  const periods = [
    { value: '1m', label: '1 Month' },
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' },
    { value: 'all', label: 'All Time' }
  ];

  return (
    <div className="analytics-page">
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Research Analytics</h1>
        <p>Comprehensive insights into NASA bioscience research trends and performance</p>
      </motion.div>

      {/* Controls */}
      <motion.div 
        className="analytics-controls"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="control-group">
          <label>Time Period:</label>
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="control-select"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Metric:</label>
          <select 
            value={selectedMetric} 
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="control-select"
          >
            <option value="publications">Publications</option>
            <option value="citations">Citations</option>
            <option value="impact">Impact Score</option>
            <option value="collaborations">Collaborations</option>
          </select>
        </div>

        <div className="control-actions">
          <button className="btn btn-secondary">
            <Filter size={16} />
            Filter
          </button>
          <button className="btn btn-secondary">
            <Download size={16} />
            Export
          </button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div 
        className="metrics-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {keyMetrics.map((metric, index) => (
          <motion.div 
            key={metric.title}
            className="metric-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="metric-icon" style={{ color: metric.color }}>
              <metric.icon size={24} />
            </div>
            <div className="metric-content">
              <div className="metric-value">{metric.value}</div>
              <div className="metric-title">{metric.title}</div>
              <div className={`metric-change ${metric.trend}`}>
                {metric.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {metric.change}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="analytics-content">
        {/* Publication Trends Chart */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="card-header">
            <h2 className="card-title">Publication Trends</h2>
            <div className="chart-controls">
              <button className="btn btn-outline">
                <Eye size={16} />
              </button>
              <button className="btn btn-outline">
                <Download size={16} />
              </button>
            </div>
          </div>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={publicationTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card-bg)', 
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="publications" 
                  stroke="var(--primary-color)" 
                  fill="var(--primary-color)"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Research Areas Distribution */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="card-header">
            <h2 className="card-title">Research Areas Distribution</h2>
          </div>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={researchAreas}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {researchAreas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="legend-items">
            {researchAreas.map((area, index) => (
              <div key={index} className="legend-item">
                <div 
                  className="legend-color" 
                  style={{ backgroundColor: area.color }}
                ></div>
                <span>{area.name}: {area.count} publications</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Authors */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="card-header">
            <h2 className="card-title">Top Researchers</h2>
          </div>
          
          <div className="authors-list">
            {topAuthors.map((author, index) => (
              <div key={index} className="author-item">
                <div className="author-rank">#{index + 1}</div>
                <div className="author-info">
                  <div className="author-name">{author.name}</div>
                  <div className="author-stats">
                    <span>{author.publications} publications</span>
                    <span>{author.citations} citations</span>
                    <span>h-index: {author.hIndex}</span>
                  </div>
                </div>
                <div className="author-score">
                  <div className="score-value">{author.hIndex}</div>
                  <div className="score-label">h-index</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mission Performance */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="card-header">
            <h2 className="card-title">Mission Performance</h2>
          </div>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={missionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="mission" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card-bg)', 
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="success" fill="var(--success-color)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* International Collaborations */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="card-header">
            <h2 className="card-title">International Collaborations</h2>
          </div>
          
          <div className="collaborations-list">
            {collaborationData.map((collab, index) => (
              <div key={index} className="collaboration-item">
                <div className="country-info">
                  <div className="country-name">{collab.country}</div>
                  <div className="country-stats">
                    {collab.collaborations} collaborations • {collab.publications} publications
                  </div>
                </div>
                <div className="collaboration-bar">
                  <div 
                    className="bar-fill"
                    style={{ width: `${(collab.collaborations / 45) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
