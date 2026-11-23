require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');

const app = express();

// Conectar a MongoDB
conectarDB();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba para verificar que el servidor responde
app.get('/', (req, res) => {
    res.json({ mensaje: 'API de Planify - Planificación de Eventos funcionando' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});