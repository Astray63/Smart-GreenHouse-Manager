import { Router } from 'express';
import { getMySQL } from '../services/mysql.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/', auth('admin'), async (req, res) => {
  try {
    const conn = getMySQL();
    const [rows] = await conn.execute('SELECT id, nom, email, role FROM Utilisateur');
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
