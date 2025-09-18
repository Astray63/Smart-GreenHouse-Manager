import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar.jsx';
import { useAuth } from '../state/AuthContext.jsx';

export default function Dashboard() {
  const { token } = useAuth();
  const [mesures, setMesures] = useState([]);

  async function load() {
    const res = await axios.get('/api/mesures?limit=30', { headers: { Authorization: `Bearer ${token}` } });
    setMesures(res.data);
  }

  useEffect(() => { load(); const i = setInterval(load, 10000); return () => clearInterval(i); }, []);

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['temperature','humidite','luminosite'].map(type => (
            <div key={type} className="bg-white p-4 rounded shadow">
              <h2 className="font-bold capitalize mb-2">{type}</h2>
              <ul className="text-sm max-h-60 overflow-y-auto">
                {mesures.map((m,i) => <li key={i}>{new Date(m.date).toLocaleTimeString()} : {m[type]}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
