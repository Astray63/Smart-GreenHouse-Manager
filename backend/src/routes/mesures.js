import { Router } from 'express';
import { Mesure } from '../services/mongo.js';
import { getMySQL } from '../services/mysql.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/', auth(), async (req, res) => {
  const limit = parseInt(req.query.limit || '50', 10);
  const mesures = await Mesure.find().sort({ date: -1 }).limit(limit).lean();
  res.json(mesures);
});

router.post('/', async (req, res) => {
  const { temperature, humidite, luminosite } = req.body;
  if (temperature == null || humidite == null || luminosite == null) {
    return res.status(400).json({ message: 'Champs manquants' });
  }
  const doc = await Mesure.create({ temperature, humidite, luminosite, date: new Date() });
  // Vérification des seuils pour chaque utilisateur
  try {
    const conn = getMySQL();
    const [users] = await conn.execute('SELECT id FROM Utilisateur');
    for (const u of users) {
      const [seuils] = await conn.execute('SELECT * FROM Seuil WHERE utilisateur_id=?', [u.id]);
      for (const s of seuils) {
        const value = s.type === 'temperature' ? temperature : s.type === 'humidite' ? humidite : luminosite;
        if ((s.valeur_min != null && value < s.valeur_min) || (s.valeur_max != null && value > s.valeur_max)) {
          await conn.execute('INSERT INTO Alerte (utilisateur_id, type, valeur, date) VALUES (?,?,?,?)', [u.id, s.type, value, new Date()]);
        }
      }
    }
  } catch (e) {
    console.error('Erreur génération alerte', e);
  }
  res.status(201).json(doc);
});

export default router;
