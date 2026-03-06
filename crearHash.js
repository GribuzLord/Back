const bcrypt = require('bcrypt');

// Generamos el hash para "123456" con 10 rondas de seguridad
const miHash = bcrypt.hashSync('123456', 10);
console.log('Tu nuevo hash es:');
console.log(miHash);