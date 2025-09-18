import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../state/AuthContext.jsx';
import Layout from '../components/Layout.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';

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
    <Layout>
      <div className="max-w-3xl mx-auto">
        <SectionHeader title="Seuils" />
        <div className="space-y-4">
          {TYPES.map(t => (
            <Card key={t}>
              <h2 className="font-semibold capitalize mb-2">{t}</h2>
              <div className="flex flex-col sm:flex-row gap-3 items-end">
                <Input type="number" label="Valeur min" value={data[t]?.valeur_min ?? ''} onChange={e=>update(t,'valeur_min', e.target.value)} className="sm:w-40" />
                <Input type="number" label="Valeur max" value={data[t]?.valeur_max ?? ''} onChange={e=>update(t,'valeur_max', e.target.value)} className="sm:w-40" />
                <div className="sm:ml-auto">
                  <Button onClick={()=>save(t)}>Sauvegarder</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
