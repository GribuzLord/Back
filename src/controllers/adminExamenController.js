const Examen = require('../models/examenModel');

// ALTA
const crearExamen = async (req, res) => {
    try {
        const nuevoId = await Examen.crear(req.body);
        res.status(201).json({
            ok: true,
            msg: 'Examen creado exitosamente',
            id_ets: nuevoId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al crear el examen' });
    }
};

// CAMBIO
const actualizarExamen = async (req, res) => {
    try {
        const { id } = req.params; // Obtenemos el ID de la URL
        const filasAfectadas = await Examen.actualizar(id, req.body);
        
        if (filasAfectadas === 0) {
            return res.status(404).json({ ok: false, msg: 'Examen no encontrado' });
        }

        res.status(200).json({ ok: true, msg: 'Examen actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al actualizar el examen' });
    }
};

// BAJA
const eliminarExamen = async (req, res) => {
    try {
        const { id } = req.params;
        const filasAfectadas = await Examen.eliminar(id);
        
        if (filasAfectadas === 0) {
            return res.status(404).json({ ok: false, msg: 'Examen no encontrado' });
        }

        res.status(200).json({ ok: true, msg: 'Examen eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al eliminar el examen' });
    }
};

module.exports = { crearExamen, actualizarExamen, eliminarExamen };