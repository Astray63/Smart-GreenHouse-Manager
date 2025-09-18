import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';

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
    <div className="min-h-screen grid place-items-center">
      <Card className="w-80 space-y-3">
        <h1 className="text-xl font-semibold text-center">Connexion</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <Input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({ ...form, email: e.target.value })} />
          <Input placeholder="Mot de passe" type="password" value={form.mot_de_passe} onChange={e=>setForm({ ...form, mot_de_passe: e.target.value })} />
          <Button type="submit" className="w-full">Se connecter</Button>
        </form>
        <div className="text-center text-xs">Pas de compte ? <Link to="/register" className="text-green-700 dark:text-green-400">Créer</Link></div>
      </Card>
    </div>
  );
}
