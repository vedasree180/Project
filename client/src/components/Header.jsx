import React from 'react';
import { Rocket, Search, Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">
            <Rocket size={24} />
          </div>
          <div className="logo-text">
            NASA Bioscience Explorer
          </div>
        </div>
        
        <div className="header-actions">
          <div className="search-bar">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search publications, experiments, or topics..."
              className="search-input"
            />
          </div>
          
          <button className="btn btn-secondary">
            <Bell size={20} />
          </button>
          
          <button className="btn btn-secondary">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
