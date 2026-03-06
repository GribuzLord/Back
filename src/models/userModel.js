const db = require('../config/db');

const Usuario = {
    // Buscar usuario por nombre (para el login)
    buscarPorUsername: async (username) => {
        const query = 'SELECT * FROM usuarios WHERE username = ?';
        const [rows] = await db.query(query, [username]);
        return rows[0]; // Retornamos el primer usuario encontrado
    },

    // Crear nuevo administrador (por si quieres agregar más después)
    crear: async (username, passwordHash) => {
        const query = 'INSERT INTO usuarios (username, password_hash) VALUES (?, ?)';
        const [result] = await db.query(query, [username, passwordHash]);
        return result.insertId;
    }
};

module.exports = Usuario;