const mysql = require('mysql2');
require('dotenv').config();

// Creamos el pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Máximo de conexiones simultáneas
    queueLimit: 0
});

// Exportamos la versión del pool que usa Promesas
const promisePool = pool.promise();

// Función opcional para probar la conexión al arrancar
const testConnection = async () => {
    try {
        await promisePool.query('SELECT 1');
        console.log('✅ Conexión a MySQL (gestion_ets_escom) exitosa.');
    } catch (err) {
        console.error('❌ Error conectando a la base de datos:', err.message);
    }
};

testConnection();

module.exports = promisePool;