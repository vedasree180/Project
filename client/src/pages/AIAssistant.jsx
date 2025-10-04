import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  FileText, 
  Lightbulb, 
  Search,
  Download,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your NASA Bioscience AI Assistant. I can help you explore research publications, analyze experimental data, and answer questions about space biology. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "What are the latest findings in plant biology research?",
        "How does microgravity affect human physiology?",
        "Show me radiation resistance studies",
        "What experiments are planned for Mars missions?"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
        sources: [
          {
            title: "Effects of Microgravity on Plant Growth Patterns",
            authors: ["Dr. Sarah Chen", "Dr. Michael Rodriguez"],
            journal: "Nature Space Biology",
            year: "2024",
            relevance: "95%"
          },
          {
            title: "Radiation Resistance in Bacterial Strains",
            authors: ["Dr. Elena Petrov", "Dr. James Wilson"],
            journal: "Astrobiology Journal",
            year: "2024",
            relevance: "87%"
          }
        ],
        insights: [
          "Recent studies show significant adaptation patterns in space environments",
          "Multiple research teams are investigating countermeasures for space-induced changes",
          "Long-duration missions require comprehensive biological monitoring"
        ]
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const generateAIResponse = (query) => {
    const responses = {
      'plant': "Based on NASA's extensive plant biology research, I found several key findings about plant growth in space environments. Plants exhibit remarkable adaptability to microgravity conditions, showing altered growth patterns, modified root architecture, and changes in gene expression. The most studied organism, Arabidopsis thaliana, has provided valuable insights into these adaptations.",
      'microgravity': "Microgravity affects biological systems in profound ways. Research shows that reduced gravity conditions impact cellular structure, fluid dynamics, and developmental processes. Human physiology experiences changes in bone density, muscle mass, and immune function during extended spaceflight.",
      'radiation': "Radiation resistance is a critical area of research for space exploration. Studies have identified several mechanisms by which organisms adapt to increased radiation exposure, including enhanced DNA repair capabilities and antioxidant production.",
      'mars': "Mars mission planning involves extensive biological research to ensure crew health and mission success. Key areas include radiation protection, life support systems, and psychological factors during long-duration missions."
    };

    const lowerQuery = query.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuery.includes(key)) {
        return response;
      }
    }

    return "I understand you're interested in NASA bioscience research. Based on the available data, I can provide insights on various topics including plant biology, human physiology, microbiology, and space medicine. Could you be more specific about what aspect you'd like to explore?";
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="ai-assistant-page">
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>AI Research Assistant</h1>
        <p>Ask questions about NASA bioscience research and get intelligent insights</p>
      </motion.div>

      <div className="chat-container">
        {/* Chat Messages */}
        <motion.div 
          className="chat-messages"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`message ${message.type}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="message-content">
                  <div className="message-header">
                    <div className="message-avatar">
                      {message.type === 'assistant' ? (
                        <Bot size={20} />
                      ) : (
                        <div className="user-avatar">U</div>
                      )}
                    </div>
                    <div className="message-meta">
                      <span className="message-sender">
                        {message.type === 'assistant' ? 'AI Assistant' : 'You'}
                      </span>
                      <span className="message-time">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="message-text">
                    {message.content}
                  </div>

                  {/* Sources */}
                  {message.sources && (
                    <div className="message-sources">
                      <h4>Sources:</h4>
                      {message.sources.map((source, index) => (
                        <div key={index} className="source-item">
                          <div className="source-content">
                            <h5>{source.title}</h5>
                            <p>{source.authors.join(', ')} - {source.journal} ({source.year})</p>
                            <span className="relevance">Relevance: {source.relevance}</span>
                          </div>
                          <button className="btn btn-outline">
                            <FileText size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Insights */}
                  {message.insights && (
                    <div className="message-insights">
                      <h4>Key Insights:</h4>
                      <ul>
                        {message.insights.map((insight, index) => (
                          <li key={index}>
                            <Lightbulb size={16} />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Message Actions */}
                  <div className="message-actions">
                    <button 
                      className="action-btn"
                      onClick={() => copyToClipboard(message.content)}
                    >
                      <Copy size={16} />
                    </button>
                    <button className="action-btn">
                      <ThumbsUp size={16} />
                    </button>
                    <button className="action-btn">
                      <ThumbsDown size={16} />
                    </button>
                    <button className="action-btn">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Suggestions */}
          {messages.length === 1 && (
            <motion.div 
              className="suggestions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h4>Try asking:</h4>
              <div className="suggestion-chips">
                {messages[0].suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="suggestion-chip"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <motion.div 
              className="loading-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="message assistant">
                <div className="message-content">
                  <div className="message-header">
                    <div className="message-avatar">
                      <Bot size={20} />
                    </div>
                    <span className="message-sender">AI Assistant</span>
                  </div>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </motion.div>

        {/* Chat Input */}
        <motion.div 
          className="chat-input-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="chat-input">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about NASA bioscience research..."
              className="input-field"
              rows={1}
            />
            
            <div className="input-actions">
              <button 
                className={`voice-btn ${isListening ? 'active' : ''}`}
                onClick={toggleListening}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              
              <button 
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
          
          <div className="input-hints">
            <span>Press Enter to send, Shift+Enter for new line</span>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions Sidebar */}
      <motion.div 
        className="quick-actions-sidebar"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h4>Quick Actions</h4>
        <div className="action-buttons">
          <button className="action-btn">
            <Search size={16} />
            Search Publications
          </button>
          <button className="action-btn">
            <FileText size={16} />
            Generate Report
          </button>
          <button className="action-btn">
            <Lightbulb size={16} />
            Research Insights
          </button>
          <button className="action-btn">
            <Download size={16} />
            Export Chat
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AIAssistant;
