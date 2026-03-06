const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');


//Ruta del login pa
router.post('/login', login);

module.exports = router;