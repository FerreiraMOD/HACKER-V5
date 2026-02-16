
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserSession } from '../types';

interface BottomNavProps {
  session: UserSession;
}

const BottomNav: React.FC<BottomNavProps> = ({ session }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!session.isAuthenticated || location.pathname === '/' || location.pathname === '/login' || location.pathname === '/paises') {
    return null;
  }

  const navItems = [
    { label: 'Hub', icon: '🏠', path: '/hub' },
    { label: 'Mines', icon: '💣', path: '/mines' },
    { label: 'Sinais', icon: '⚡', path: '/generator' },
    { label: 'Auto', icon: '🤖', path: '/auto' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-glass-heavy flex items-center justify-around z-40 border-t border-cyan-500/20 md:hidden">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => {
            if (navigator.vibrate) navigator.vibrate(10);
            navigate(item.path);
          }}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            location.pathname === item.path ? 'neon-cyan scale-110' : 'text-gray-500'
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="text-[10px] uppercase font-bold">{item.label}</span>
          {location.pathname === item.path && (
            <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_5px_#00f3ff]"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
