const Usuario = require('../models/userModel');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Verificar si el usuario existe
        const usuario = await Usuario.buscarPorUsername(username);
        if (!usuario) {
            return res.status(401).json({ ok: false, msg: 'Credenciales incorrectas (U)' });
        }

        // 2. Comparar la contraseña enviada con el hash de la DB
        const validPassword = await bcrypt.compare(password, usuario.password_hash);
        if (!validPassword) {
            return res.status(401).json({ ok: false, msg: 'Credenciales incorrectas (P)' });
        }

        // 3. Respuesta exitosa para el Dashboard
        res.json({
            ok: true,
            msg: 'Bienvenido al sistema de gestión ETS',
            user: { id: usuario.id_usuario, username: usuario.username, rol: usuario.rol }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error en el servidor durante el login' });
    }
};

module.exports = { login };