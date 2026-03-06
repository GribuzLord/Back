const db = require('../config/db');

const Examen = {
    // Lógica para el Buscador Inteligente (Módulo Público)
    buscar: async (filtros) => {
        const { id_carrera, semestre, materia } = filtros;
        
        // Base de la consulta con JOINs para traer información completa
        let query = `
            SELECT e.id_ets, m.nombre_materia, m.semestre, c.nombre_carrera, e.fecha, e.turno, s.edificio, s.numero_salon, p.nombre_completo as profesor
            FROM examenes_ets e
            JOIN materias m ON e.id_materia = m.id_materia
            JOIN carreras c ON m.id_carrera = c.id_carrera
            JOIN salones s ON e.id_salon = s.id_salon
            JOIN profesores p ON e.id_profesor = p.id_profesor
            WHERE 1=1
        `;

        const params = [];

        // Filtro dinámico por Carrera
        if (id_carrera) {
            query += " AND c.id_carrera = ?";
            params.push(id_carrera);
        }

        // Filtro dinámico por Semestre
        if (semestre) {
            query += " AND m.semestre = ?";
            params.push(semestre);
        }

        // Filtro inteligente por nombre de Materia (Buscador)
        if (materia) {
            query += " AND m.nombre_materia LIKE ?";
            params.push(`%${materia}%`);
        }

        query += " ORDER BY e.fecha ASC";

        const [rows] = await db.query(query, params);
        return rows;
    },

    // Para el Dashboard Administrativo: Estadísticas rápidas
    obtenerEstadisticas: async () => {
        const query = `
            SELECT c.nombre_carrera, COUNT(e.id_ets) as total_examenes
            FROM carreras c
            LEFT JOIN materias m ON c.id_carrera = m.id_carrera
            LEFT JOIN examenes_ets e ON m.id_materia = e.id_materia
            GROUP BY c.id_carrera
        `;
        const [rows] = await db.query(query);
        return rows;
    }
};

module.exports = Examen;