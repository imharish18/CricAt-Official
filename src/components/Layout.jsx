import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUserPlus, FaUsers, FaTrophy, FaCog, FaPlayCircle, FaShieldAlt } from 'react-icons/fa';

const navItems = [
  { path: '/', label: 'Home', icon: <FaHome /> },
  { path: '/register', label: 'Register Player', icon: <FaUserPlus /> },
  { path: '/players', label: 'Player List', icon: <FaUsers /> },
  { path: '/teams', label: 'Teams', icon: <FaShieldAlt /> },
  { path: '/match-setup', label: 'Match Setup', icon: <FaCog /> },
  { path: '/live-match', label: 'Live Match', icon: <FaPlayCircle /> },
  { path: '/admin', label: 'Admin', icon: <FaTrophy /> },
];

export const Layout = ({ children }) => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex">
      <aside className="w-64 bg-gray-950 p-4 flex flex-col">
        <h1 className="text-2xl font-bold text-green-400 mb-8">🏏 CricAt</h1>
        <nav className="flex flex-col space-y-2">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center space-x-3 p-2 rounded-md transition-colors ${
                  isActive ? 'bg-green-500 text-white' : 'hover:bg-gray-700'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};