import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getMySQL } from '../services/mysql.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { nom, email, mot_de_passe, role = 'user' } = req.body;
  if (!nom || !email || !mot_de_passe) return res.status(400).json({ message: 'Champs requis manquants' });
  try {
    const conn = getMySQL();
    const [rows] = await conn.execute('SELECT id FROM Utilisateur WHERE email=?', [email]);
    if (rows.length) return res.status(409).json({ message: 'Email déjà utilisé' });
    const hash = await bcrypt.hash(mot_de_passe, 10);
    await conn.execute('INSERT INTO Utilisateur (nom, email, mot_de_passe, role) VALUES (?,?,?,?)', [nom, email, hash, role]);
    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.post('/login', async (req, res) => {
  const { email, mot_de_passe } = req.body;
  if (!email || !mot_de_passe) return res.status(400).json({ message: 'Champs requis manquants' });
  try {
    const conn = getMySQL();
    const [rows] = await conn.execute('SELECT * FROM Utilisateur WHERE email=?', [email]);
    if (!rows.length) return res.status(401).json({ message: 'Identifiants invalides' });
    const user = rows[0];
    const match = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!match) return res.status(401).json({ message: 'Identifiants invalides' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '8h' });
    res.json({ token, user: { id: user.id, nom: user.nom, email: user.email, role: user.role } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
