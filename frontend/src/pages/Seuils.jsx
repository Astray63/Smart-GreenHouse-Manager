import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar.jsx';
import { useAuth } from '../state/AuthContext.jsx';

const TYPES = ['temperature','humidite','luminosite'];

export default function Seuils() {
  const { token, user } = useAuth();
  const [data, setData] = useState({});

  async function load() {
    const res = await axios.get(`/api/seuils/${user.id}`, { headers: { Authorization: `Bearer ${token}` } });
    const map = {}; res.data.forEach(s => { map[s.type] = s; });
    setData(map);
  }
  useEffect(() => { load(); }, []);

  async function save(type) {
    const body = { type, valeur_min: data[type]?.valeur_min ?? null, valeur_max: data[type]?.valeur_max ?? null };
    await axios.post('/api/seuils', body, { headers: { Authorization: `Bearer ${token}` } });
    load();
  }

  function update(type, field, value) {
    setData(d => ({ ...d, [type]: { ...d[type], type, [field]: value === '' ? '' : parseFloat(value) } }));
  }

  return (
    <div>
      <NavBar />
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Seuils</h1>
        <div className="space-y-4">
          {TYPES.map(t => (
            <div key={t} className="bg-white p-4 rounded shadow">
              <h2 className="font-bold capitalize mb-2">{t}</h2>
              <div className="flex gap-2 items-end">
                <div>
                  <label className="block text-xs">Valeur min</label>
                  <input type="number" value={data[t]?.valeur_min ?? ''} onChange={e=>update(t,'valeur_min', e.target.value)} className="border p-1 rounded" />
                </div>
                <div>
                  <label className="block text-xs">Valeur max</label>
                  <input type="number" value={data[t]?.valeur_max ?? ''} onChange={e=>update(t,'valeur_max', e.target.value)} className="border p-1 rounded" />
                </div>
                <button onClick={()=>save(t)} className="ml-auto bg-green-600 text-white px-3 py-1 rounded">Sauvegarder</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
