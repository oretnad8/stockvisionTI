import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar:', err.message);
        process.exit(1);
    }
    
    db.run('ALTER TABLE items ADD COLUMN categoria TEXT', (err) => {
        if (err) {
            console.log('Error o la columna ya existe:', err.message);
        } else {
            console.log('Columna categoria agregada.');
        }
        process.exit(0);
    });
});
