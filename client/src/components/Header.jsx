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
        
        
      </div>
    </header>
  );
};

export default Header;
