import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    db.run('PRAGMA foreign_keys = ON');
    db.run(`
        CREATE TABLE IF NOT EXISTS item_locations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_id INTEGER,
            ubicacion TEXT,
            stock INTEGER DEFAULT 0,
            FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (!err) {
            db.all("SELECT id, ubicacion, stock_total FROM items WHERE ubicacion IS NOT NULL AND ubicacion != ''", (e, rows) => {
                rows.forEach(r => {
                    db.get("SELECT COUNT(*) as count FROM item_locations WHERE item_id = ?", [r.id], (err, res) => {
                        if (!err && res.count === 0) {
                            db.run("INSERT INTO item_locations (item_id, ubicacion, stock) VALUES (?, ?, ?)", [r.id, r.ubicacion, r.stock_total]);
                        }
                    });
                });
            });
        }
    });
});