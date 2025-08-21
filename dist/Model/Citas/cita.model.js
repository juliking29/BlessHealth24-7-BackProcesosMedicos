"use strict";
// Model/Cita/cita.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../config/database");
class CitaModel {
    // Método para disponibilidad por hora específica
    static async obtenerMedicosDisponiblesPorEspecialidad(filtros) {
        const query = `
            CALL CLINICA_PI3.ObtenerMedicosDisponiblesPorEspecialidad(?, ?, ?)
        `;
        const [rows] = await database_1.pool.query(query, [
            filtros.idEspecialidad,
            filtros.fecha,
            filtros.hora
        ]);
        return rows[0];
    }
    // Método para disponibilidad por rango de fechas
    static async obtenerMedicosDisponiblesPorSedeEspecialidad(filtros) {
        const query = `
            CALL CLINICA_PI3.ObtenerMedicosDisponiblesPorSedeEspecialidad(?, ?, ?, ?)
        `;
        const [rows] = await database_1.pool.query(query, [
            filtros.idSede,
            filtros.idEspecialidad,
            filtros.fechaInicio,
            filtros.fechaFin
        ]);
        return rows[0];
    }
    // Método para horarios disponibles en un día
    static async obtenerMedicosConHorariosDisponibles(filtros) {
        const query = `
            CALL CLINICA_PI3.ObtenerMedicosConHorariosDisponibles(?, ?, ?)
        `;
        const [rows] = await database_1.pool.query(query, [
            filtros.idSede,
            filtros.idEspecialidad,
            filtros.fecha
        ]);
        return rows[0];
    }
    // Obtener todas las citas con información relacionada
    static async obtenerTodos() {
        const query = `
            SELECT 
                c.*,
                CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
                CONCAT(m.nombreUsuario, ' ', m.apellidoUsuario) AS nombreMedico,
                s.nombreServicio,
                e.nombreEspecialidad,
                se.nombreSede
            FROM CLINICA_PI3.CITAS c
            LEFT JOIN CLINICA_PI3.USUARIOS p ON c.idPaciente = p.idUsuario
            LEFT JOIN CLINICA_PI3.USUARIOS m ON c.idMedico = m.idUsuario
            LEFT JOIN CLINICA_PI3.SERVICIOS s ON c.idServicio = s.idServicio
            LEFT JOIN CLINICA_PI3.ESPECIALIDADES e ON s.idEspecialidad = e.idEspecialidad
            LEFT JOIN CLINICA_PI3.SEDES se ON c.idSede = se.idSede
            ORDER BY c.fechaHora DESC
        `;
        const [rows] = await database_1.pool.query(query);
        return rows;
    }
    // Obtener una cita por su ID
    static async obtenerPorId(id) {
        const query = `
            SELECT 
                c.*,
                CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
                CONCAT(m.nombreUsuario, ' ', m.apellidoUsuario) AS nombreMedico,
                s.nombreServicio,
                e.nombreEspecialidad,
                se.nombreSede
            FROM CLINICA_PI3.CITAS c
            LEFT JOIN CLINICA_PI3.USUARIOS p ON c.idPaciente = p.idUsuario
            LEFT JOIN CLINICA_PI3.USUARIOS m ON c.idMedico = m.idUsuario
            LEFT JOIN CLINICA_PI3.SERVICIOS s ON c.idServicio = s.idServicio
            LEFT JOIN CLINICA_PI3.ESPECIALIDADES e ON s.idEspecialidad = e.idEspecialidad
            LEFT JOIN CLINICA_PI3.SEDES se ON c.idSede = se.idSede
            WHERE c.idCita = ?
        `;
        const [rows] = await database_1.pool.query(query, [id]);
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        }
        return null;
    }
    // Crear una nueva cita
    static async crear(cita) {
        const query = `
            CALL CLINICA_PI3.AgendarCita(?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await database_1.pool.query(query, [
            cita.idPaciente,
            cita.idServicio,
            cita.idSede,
            cita.fechaHora,
            cita.motivo,
            cita.sintomas || '',
            cita.idMedico
        ]);
        // El procedimiento devuelve el ID de la cita creada
        return result[0][0].idCita;
    }
    static async actualizar(id, cita) {
        const query = `
        CALL CLINICA_PI3.ActualizarCita(?, ?, ?, ?, ?)
    `;
        await database_1.pool.query(query, [
            id, // p_idCita
            cita.idMedico || null, // p_idMedico
            cita.fechaHora, // p_fechaHora
            cita.estadoCita || '', // p_estadoCita ← ¡Agregar este campo!
            cita.observaciones || '' // p_observaciones ← Y este también
        ]);
        const citaActualizada = await this.obtenerPorId(id);
        if (!citaActualizada) {
            throw new Error('Cita no encontrada después de actualización');
        }
        return citaActualizada;
    }
    // Cancelar una cita
    static async cancelar(id, motivoCancelacion) {
        const query = `
            CALL CLINICA_PI3.CancelarCita(?, ?)
        `;
        await database_1.pool.query(query, [id, motivoCancelacion]);
    }
    // Eliminar una cita
    static async eliminar(id) {
        const query = `
            CALL CLINICA_PI3.EliminarCita(?)
        `;
        await database_1.pool.query(query, [id]);
    }
    // Finalizar una cita
    static async finalizar(id) {
        const query = `
            CALL CLINICA_PI3.FinalizarCitaConRegistro(?)
        `;
        const [result] = await database_1.pool.query(query, [id]);
        return result[0][0];
    }
    // Obtener todos los médicos con sus especialidades
    static async obtenerTodosMedicosConEspecialidades() {
        const query = `
            CALL CLINICA_PI3.ObtenerTodosMedicosConEspecialidades()
        `;
        const [rows] = await database_1.pool.query(query);
        return rows[0];
    }
    static async obtenerCitasPorPaciente(idPaciente, estado) {
        const query = `
            CALL CLINICA_PI3.ObtenerCitasPorPaciente(?, ?)
        `;
        const [rows] = await database_1.pool.query(query, [idPaciente, estado || null]);
        return rows[0];
    }
    // Obtener citas por doctor
    static async obtenerCitasPorDoctor(idMedico, estado, fechaInicio, fechaFin) {
        const query = `
            CALL CLINICA_PI3.ObtenerCitasPorDoctor(?, ?, ?, ?)
        `;
        const [rows] = await database_1.pool.query(query, [
            idMedico,
            estado || null,
            fechaInicio || null,
            fechaFin || null
        ]);
        return rows[0];
    }
    // Obtener todas las sedes
    static async obtenerSedes() {
        const query = `
            SELECT * FROM CLINICA_PI3.SEDES
        `;
        const [rows] = await database_1.pool.query(query);
        return rows;
    }
    // Obtener todas las especialidades
    static async obtenerEspecialidades() {
        const query = `
            SELECT * FROM CLINICA_PI3.ESPECIALIDADES
        `;
        const [rows] = await database_1.pool.query(query);
        return rows;
    }
    // Obtener todos los servicios
    static async obtenerServicios() {
        const query = `
            SELECT * FROM CLINICA_PI3.SERVICIOS
        `;
        const [rows] = await database_1.pool.query(query);
        return rows;
    }
    // Buscar citas por paciente (con cédula)
    static async buscarCitasPorPaciente(cedulaPaciente, fechaInicio, fechaFin) {
        const query = `
        CALL CLINICA_PI3.BuscarCitasPaciente(?, ?, ?)
    `;
        const [rows] = await database_1.pool.query(query, [
            cedulaPaciente,
            fechaInicio || null,
            fechaFin || null
        ]);
        return rows[0];
    }
    // Buscar citas por médico (con cédula)
    static async buscarCitasPorMedico(cedulaMedico, fechaInicio, fechaFin) {
        const query = `
        CALL CLINICA_PI3.BuscarCitasMedico(?, ?, ?)
    `;
        const [rows] = await database_1.pool.query(query, [
            cedulaMedico,
            fechaInicio || null,
            fechaFin || null
        ]);
        return rows[0];
    }
}
exports.default = CitaModel;
