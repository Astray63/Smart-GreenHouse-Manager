import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar.jsx';
import { useAuth } from '../state/AuthContext.jsx';

export default function Alertes() {
  const { token } = useAuth();
  const [alertes, setAlertes] = useState([]);

  async function load() {
    const res = await axios.get('/api/alertes', { headers: { Authorization: `Bearer ${token}` } });
    setAlertes(res.data);
  }
  useEffect(() => { load(); }, []);

  return (
    <div>
      <NavBar />
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Alertes</h1>
        <table className="w-full text-sm bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left"><th className="p-2">Date</th><th className="p-2">Type</th><th className="p-2">Valeur</th></tr>
          </thead>
          <tbody>
            {alertes.map(a => (
              <tr key={a.id} className="border-t"><td className="p-2">{new Date(a.date).toLocaleString()}</td><td className="p-2">{a.type}</td><td className="p-2">{a.valeur}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
