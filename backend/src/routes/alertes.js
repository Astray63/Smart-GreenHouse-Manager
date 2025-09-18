import { Router } from 'express';
import { getMySQL } from '../services/mysql.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/', auth(), async (req, res) => {
  try {
    const conn = getMySQL();
    const [rows] = await conn.execute('SELECT * FROM Alerte WHERE utilisateur_id=? ORDER BY date DESC LIMIT 200', [req.user.id]);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
