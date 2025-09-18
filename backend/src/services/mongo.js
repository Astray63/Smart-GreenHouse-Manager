import mongoose from 'mongoose';

const mesureSchema = new mongoose.Schema({
  temperature: Number,
  humidite: Number,
  luminosite: Number,
  date: { type: Date, default: Date.now }
});

export const Mesure = mongoose.model('Mesure', mesureSchema);

export async function initMongo() {
  const uri = process.env.MONGO_URI || 'mongodb://mongo:27017/greenhouse';
  await mongoose.connect(uri, { dbName: 'greenhouse' });
}
