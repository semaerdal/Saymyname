const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Datenbank-Konfiguration
const dbConfig = {
  host: 'localhost',
  user: 'root', // Mit Ihrem MySQL-Benutzernamen ersetzen
  password: '', // Mit Ihrem MySQL-Passwort ersetzen
  database: 'auth_system'
};

// Datenbank-Verbindungspool erstellen
const pool = mysql.createPool(dbConfig);

// Tabellen erstellen, falls sie nicht existieren
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    connection.release();
    console.log('Datenbank initialisiert');
  } catch (error) {
    console.error('Datenbank-Initialisierung fehlgeschlagen:', error);
  }
}

initializeDatabase();

// Registrierungs-Endpunkt
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Überprüfen, ob Benutzer bereits existiert
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Benutzer existiert bereits' });
    }
    
    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Neuen Benutzer einfügen
    await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword]
    );
    
    res.status(201).json({ message: 'Benutzer erfolgreich registriert' });
  } catch (error) {
    console.error('Registrierungsfehler:', error);
    res.status(500).json({ message: 'Registrierung fehlgeschlagen' });
  }
});

// Login-Endpunkt
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Benutzer per E-Mail suchen
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Ungültige Anmeldedaten' });
    }
    
    const user = rows[0];
    
    // Passwörter vergleichen
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Ungültige Anmeldedaten' });
    }
    
    // Zur Vereinfachung geben wir nur die Benutzerdaten zurück (in einer echten App würden Sie ein Token zurückgeben)
    res.json({ 
      message: 'Anmeldung erfolgreich',
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Anmeldefehler:', error);
    res.status(500).json({ message: 'Anmeldung fehlgeschlagen' });
  }
});

// Server starten
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});