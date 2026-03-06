const Examen = require('../models/examenModel');

const getExamenes = async (req, res) => {
    try {
        // Extraemos los filtros de la URL (Query Params)
        // Ejemplo: /api/examenes?id_carrera=1&semestre=2
        const { id_carrera, semestre, materia } = req.query;

        const resultados = await Examen.buscar({ id_carrera, semestre, materia });

        if (resultados.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron exámenes con esos criterios.'
            });
        }

        // Si todo sale bien, enviamos los datos (Visualización Dinámica)
        res.status(200).json({
            ok: true,
            data: resultados
        });

    } catch (error) {
        console.error(error);
        // Manejo profesional de errores (500) solicitado en el documento
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor. Intente más tarde.'
        });
    }
};

const getStats = async (req, res) => {
    try {
        const stats = await Examen.obtenerEstadisticas();
        res.status(200).json({
            ok: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener estadísticas del Dashboard.'
        });
    }
};

module.exports = {
    getExamenes,
    getStats
};