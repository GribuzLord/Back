const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./src/config/db'); // Aquí se dispara la conexión

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Puerto
const PORT = process.env.PORT || 3000;

//Ruta buscador:
app.use('/api/examenes', require('./src/routes/publicRoutes'));
app.use('/api/admin', require('./src/routes/adminRoutes'));

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});