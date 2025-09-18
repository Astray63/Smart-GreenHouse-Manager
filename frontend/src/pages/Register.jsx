import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ nom: '', email: '', mot_de_passe: '' });
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      nav('/login');
    } catch (e) { setError(e.response?.data?.message || 'Erreur'); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-80 space-y-3">
        <h1 className="text-xl font-semibold text-center">Créer un compte</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <input placeholder="Nom" value={form.nom} onChange={e=>setForm({ ...form, nom: e.target.value })} className="border p-2 w-full rounded" />
        <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({ ...form, email: e.target.value })} className="border p-2 w-full rounded" />
        <input placeholder="Mot de passe" type="password" value={form.mot_de_passe} onChange={e=>setForm({ ...form, mot_de_passe: e.target.value })} className="border p-2 w-full rounded" />
        <button className="bg-green-600 text-white w-full py-2 rounded">S'enregistrer</button>
        <div className="text-center text-xs">Déjà un compte ? <Link to="/login" className="text-green-700">Connexion</Link></div>
      </form>
    </div>
  );
}
