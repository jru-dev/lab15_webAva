const express = require('express');
const cors = require('cors');
const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const categoriesRoutes = require('./routes/categories');

const app = express();

// Configuración CORS temporal (permite todos los orígenes)
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

module.exports = app;