import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Config para subida de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// === Endpoints ===

// Obtener todos los items
app.get('/api/items', (req, res) => {
    const query = `SELECT * FROM items ORDER BY updated_at DESC`;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ status: 'error', message: err.message });
        
        const processedRows = rows.map(row => {
            let ubicaciones = [];
            if (row.ubicacion) {
                try {
                    ubicaciones = JSON.parse(row.ubicacion);
                } catch (e) {
                    // Si no es JSON, es una ubicación legacy en texto
                    ubicaciones = [{ ubicacion: row.ubicacion, stock: row.stock_total || 0 }];
                }
            }
            return {
                ...row,
                ubicaciones
            };
        });
        
        res.json({ status: 'success', data: processedRows });
    });
});

// Crear un item
app.post('/api/items', (req, res) => {
    let { cod_producto, producto, marca, modelo, stock_total, ubicacion, ubicaciones, url_imagen, categoria } = req.body;
    
    if (ubicaciones && Array.isArray(ubicaciones)) {
        ubicacion = JSON.stringify(ubicaciones);
        stock_total = ubicaciones.reduce((sum, loc) => sum + (parseInt(loc.stock) || 0), 0);
    }

    const query = `
        INSERT INTO items (cod_producto, producto, marca, modelo, stock_total, ubicacion, url_imagen, categoria)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [cod_producto, producto, marca, modelo, stock_total, ubicacion, url_imagen, categoria], function(err) {
        if (err) return res.status(500).json({ status: 'error', message: err.message });
        res.json({ status: 'success', data: { id: this.lastID } });
    });
});

// Actualizar un item
app.put('/api/items/:id', (req, res) => {
    const id = req.params.id;
    let { cod_producto, producto, marca, modelo, stock_total, ubicacion, ubicaciones, url_imagen, categoria } = req.body;
    
    if (ubicaciones && Array.isArray(ubicaciones)) {
        ubicacion = JSON.stringify(ubicaciones);
        stock_total = ubicaciones.reduce((sum, loc) => sum + (parseInt(loc.stock) || 0), 0);
    }

    const query = `
        UPDATE items 
        SET cod_producto = ?, producto = ?, marca = ?, modelo = ?, stock_total = ?, ubicacion = ?, url_imagen = ?, categoria = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ? OR cod_producto = ?
    `;
    // We allow updating by internal ID or cod_producto
    db.run(query, [cod_producto, producto, marca, modelo, stock_total, ubicacion, url_imagen, categoria, id, id], function(err) {
        if (err) return res.status(500).json({ status: 'error', message: err.message });
        res.json({ status: 'success', message: 'Item actualizado' });
    });
});

// Eliminar un item
app.delete('/api/items/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM items WHERE id = ? OR cod_producto = ?`;
    db.run(query, [id, id], function(err) {
        if (err) return res.status(500).json({ status: 'error', message: err.message });
        res.json({ status: 'success', message: 'Item eliminado' });
    });
});

// Subir imagen
app.post('/api/upload', upload.single('imagen'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: 'error', message: 'No se subió ninguna imagen' });
    }
    // Devolvemos la URL local
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ status: 'success', url: imageUrl });
});

// Servir frontend en producción
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
        res.sendFile(path.join(distPath, 'index.html'));
    } else {
        next();
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});