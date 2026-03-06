const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { crearExamen, actualizarExamen, eliminarExamen } = require('../controllers/adminExamenController');


//Ruta del login pa
router.post('/login', login);

// CRUD de Exámenes ETS
router.post('/examenes', crearExamen);          // Alta
router.put('/examenes/:id', actualizarExamen);  // Cambio
router.delete('/examenes/:id', eliminarExamen); // Baja

module.exports = router;