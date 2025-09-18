import mysql from 'mysql2/promise';

let connection;

async function tryConnect() {
  return await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'mysql',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: process.env.MYSQL_DB || 'greenhouse'
  });
}

export async function initMySQL({ retries = 10, baseDelayMs = 500 } = {}) {
  if (connection) return connection;
  let attempt = 0;
  while (!connection) {
    try {
      attempt++;
      connection = await tryConnect();
      console.log(`[MySQL] Connected after attempt ${attempt}`);
    } catch (err) {
      const isLast = attempt >= retries;
      const delay = Math.min(baseDelayMs * 2 ** (attempt - 1), 8000);
      console.warn(`[MySQL] Connection attempt ${attempt} failed: ${err.code || err.message}${isLast ? '' : ` -> retry in ${delay}ms`}`);
      if (isLast) throw err;
      await new Promise(r => setTimeout(r, delay));
    }
  }

  await connection.execute(`CREATE TABLE IF NOT EXISTS Utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user'
  ) ENGINE=InnoDB;`);
  await connection.execute(`CREATE TABLE IF NOT EXISTS Seuil (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    valeur_min FLOAT NULL,
    valeur_max FLOAT NULL,
    UNIQUE KEY unique_user_type (utilisateur_id, type),
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(id) ON DELETE CASCADE
  ) ENGINE=InnoDB;`);
  await connection.execute(`CREATE TABLE IF NOT EXISTS Alerte (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    valeur FLOAT NOT NULL,
    date DATETIME NOT NULL,
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(id) ON DELETE CASCADE
  ) ENGINE=InnoDB;`);
  return connection;
}

export function getMySQL() {
  if (!connection) throw new Error('MySQL non initialisé');
  return connection;
}
