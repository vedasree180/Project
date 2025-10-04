import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import './App.css';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Publications from './pages/Publications';
import KnowledgeGraph from './pages/KnowledgeGraph';
import AIAssistant from './pages/AIAssistant';
import Analytics from './pages/Analytics';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="app">
          <Header />
          <div className="app-body">
            <Sidebar />
            <motion.main 
              className="main-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </motion.main>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;