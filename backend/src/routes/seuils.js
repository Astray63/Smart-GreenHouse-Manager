import { Router } from 'express';
import { getMySQL } from '../services/mysql.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.post('/', auth(), async (req, res) => {
  const { type, valeur_min, valeur_max } = req.body;
  if (!type) return res.status(400).json({ message: 'Type requis' });
  try {
    const conn = getMySQL();
    // Upsert simple
    await conn.execute(`REPLACE INTO Seuil (id, utilisateur_id, type, valeur_min, valeur_max)
      VALUES ((SELECT id FROM (SELECT id FROM Seuil WHERE utilisateur_id=? AND type=?) AS t),?,?,?,?)`, [req.user.id, type, req.user.id, type, valeur_min, valeur_max]);
    res.json({ message: 'Seuil enregistré' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/:id', auth(), async (req, res) => {
  const { id } = req.params;
  try {
    const conn = getMySQL();
    const [rows] = await conn.execute('SELECT * FROM Seuil WHERE utilisateur_id=?', [id]);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
