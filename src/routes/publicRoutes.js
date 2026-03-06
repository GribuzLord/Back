const express = require('express');
const router = express.Router();
const { getExamenes, getStats } = require('../controllers/examenController');

// Ruta para el Buscador Inteligente
router.get('/buscar', getExamenes);

// Ruta para el Dashboard (Estadísticas)
router.get('/stats', getStats);

module.exports = router;