import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import seuilRoutes from './routes/seuils.js';
import alerteRoutes from './routes/alertes.js';
import mesureRoutes from './routes/mesures.js';
import { initMySQL } from './services/mysql.js';
import { initMongo } from './services/mongo.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/seuils', seuilRoutes);
app.use('/api/alertes', alerteRoutes);
app.use('/api/mesures', mesureRoutes);

const PORT = process.env.PORT || 4000;

async function start() {
  await initMySQL();
  await initMongo();
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}

start();
