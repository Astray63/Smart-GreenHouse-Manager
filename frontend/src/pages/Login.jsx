import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';

export default function Login() {
  const { setToken, setUser } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', mot_de_passe: '' });
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      setToken(res.data.token); setUser(res.data.user); nav('/');
    } catch (e) { setError(e.response?.data?.message || 'Erreur'); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-80 space-y-3">
        <h1 className="text-xl font-semibold text-center">Connexion</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({ ...form, email: e.target.value })} className="border p-2 w-full rounded" />
        <input placeholder="Mot de passe" type="password" value={form.mot_de_passe} onChange={e=>setForm({ ...form, mot_de_passe: e.target.value })} className="border p-2 w-full rounded" />
        <button className="bg-green-600 text-white w-full py-2 rounded">Se connecter</button>
        <div className="text-center text-xs">Pas de compte ? <Link to="/register" className="text-green-700">Créer</Link></div>
      </form>
    </div>
  );
}
