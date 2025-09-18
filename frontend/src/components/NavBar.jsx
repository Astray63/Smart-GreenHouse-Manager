import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';

export default function NavBar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-green-700 text-white px-4 py-2 flex gap-4 items-center">
      <span className="font-bold">Serre</span>
      <Link to="/">Dashboard</Link>
      <Link to="/seuils">Seuils</Link>
      <Link to="/alertes">Alertes</Link>
      <div className="ml-auto flex items-center gap-3">
        {user && <span>{user.nom} ({user.role})</span>}
        <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
}
