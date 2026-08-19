import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a SQLite:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        initDB();
    }
});

const initDB = () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cod_producto TEXT UNIQUE,
            producto TEXT,
            marca TEXT,
            modelo TEXT,
            stock_total INTEGER DEFAULT 0,
            ubicacion TEXT,
            url_imagen TEXT,
            categoria TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;
    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error creando tabla items:', err.message);
        } else {
            console.log('Tabla items lista.');
        }
    });
};

export default db;