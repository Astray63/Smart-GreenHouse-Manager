import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';

export default function NavBar({ rightSlot }) {
  const { user, logout } = useAuth();
  const linkBase = 'px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10';
  const active = ({ isActive }) => `${linkBase} ${isActive ? 'bg-white/20' : ''}`;
  return (
    <header className="sticky top-0 z-40 border-b border-green-700/30 bg-green-700/90 text-white backdrop-blur">
      <div className="container flex h-14 items-center gap-2">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">🌱 Smart Greenhouse</span>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={active}>Dashboard</NavLink>
            <NavLink to="/seuils" className={active}>Seuils</NavLink>
            <NavLink to="/alertes" className={active}>Alertes</NavLink>
          </nav>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {rightSlot}
          {user && <span className="hidden sm:block text-sm opacity-90">{user.nom} ({user.role})</span>}
          <button onClick={logout} className="btn-ghost text-white">Logout</button>
        </div>
      </div>
    </header>
  );
}
