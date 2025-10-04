import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Network, 
  Bot, 
  BarChart3,
  Settings,
  HelpCircle
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/publications', icon: FileText, label: 'Publications' },
    { path: '/knowledge-graph', icon: Network, label: 'Knowledge Graph' },
    { path: '/ai-assistant', icon: Bot, label: 'AI Assistant' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const bottomItems = [
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/help', icon: HelpCircle, label: 'Help' },
  ];

  return (
    <aside className="sidebar">
      <nav>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                end={item.exact}
              >
                <item.icon className="nav-icon" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        
        <div className="nav-divider"></div>
        
        <ul className="nav-menu">
          {bottomItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <item.icon className="nav-icon" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
