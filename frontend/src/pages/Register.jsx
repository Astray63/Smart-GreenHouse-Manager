import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';

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
    <div className="min-h-screen grid place-items-center">
      <Card className="w-80 space-y-3">
        <h1 className="text-xl font-semibold text-center">Créer un compte</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <Input placeholder="Nom" value={form.nom} onChange={e=>setForm({ ...form, nom: e.target.value })} />
          <Input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({ ...form, email: e.target.value })} />
          <Input placeholder="Mot de passe" type="password" value={form.mot_de_passe} onChange={e=>setForm({ ...form, mot_de_passe: e.target.value })} />
          <Button type="submit" className="w-full">S'enregistrer</Button>
        </form>
        <div className="text-center text-xs">Déjà un compte ? <Link to="/login" className="text-green-700 dark:text-green-400">Connexion</Link></div>
      </Card>
    </div>
  );
}
