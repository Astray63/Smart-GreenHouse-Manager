import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../state/AuthContext.jsx';
import Layout from '../components/Layout.jsx';
import Card from '../components/ui/Card.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';

export default function Dashboard() {
  const { token } = useAuth();
  const [mesures, setMesures] = useState([]);

  async function load() {
    const res = await axios.get('/api/mesures?limit=30', { headers: { Authorization: `Bearer ${token}` } });
    setMesures(res.data);
  }

  useEffect(() => { load(); const i = setInterval(load, 10000); return () => clearInterval(i); }, []);

  return (
    <Layout>
      <SectionHeader title="Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['temperature','humidite','luminosite'].map(type => (
          <Card key={type}>
            <h2 className="font-semibold capitalize">{type}</h2>
            <ul className="mt-2 text-sm max-h-60 overflow-y-auto space-y-1">
              {mesures.map((m,i) => (
                <li key={i} className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>{new Date(m.date).toLocaleTimeString()}</span>
                  <span className="font-medium">{m[type]}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
