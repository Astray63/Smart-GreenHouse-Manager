import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../state/AuthContext.jsx';
import Layout from '../components/Layout.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import Card from '../components/ui/Card.jsx';

export default function Alertes() {
  const { token } = useAuth();
  const [alertes, setAlertes] = useState([]);

  async function load() {
    const res = await axios.get('/api/alertes', { headers: { Authorization: `Bearer ${token}` } });
    setAlertes(res.data);
  }
  useEffect(() => { load(); }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Alertes" />
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="p-2">Date</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Valeur</th>
                </tr>
              </thead>
              <tbody>
                {alertes.map(a => (
                  <tr key={a.id} className="border-t border-gray-100 dark:border-gray-700">
                    <td className="p-2">{new Date(a.date).toLocaleString()}</td>
                    <td className="p-2 capitalize">{a.type}</td>
                    <td className="p-2 font-medium">{a.valeur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
