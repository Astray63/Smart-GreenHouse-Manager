import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API = process.env.API_URL || 'http://localhost:4000/api/mesures';

function randomIn(min, max) { return +(Math.random() * (max - min) + min).toFixed(2); }

async function send() {
  const payload = {
    temperature: randomIn(15,30),
    humidite: randomIn(30,90),
    luminosite: randomIn(200,1000)
  };
  try {
    await axios.post(API, payload);
    console.log('Mesure envoyée', payload);
  } catch (e) {
    console.error('Erreur envoi', e.message);
  }
}

send();
setInterval(send, 60_000);
