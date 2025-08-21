"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../config/database");
class CitaModel {
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
        return result[0][0].idCita;
    }
    static async actualizar(id, cita) {
        const query = `
        CALL CLINICA_PI3.ActualizarCita(?, ?, ?, ?, ?)
    `;
        await database_1.pool.query(query, [
            id,
            cita.idMedico || null,
            cita.fechaHora,
            cita.estadoCita || '',
            cita.observaciones || ''
        ]);
        const citaActualizada = await this.obtenerPorId(id);
        if (!citaActualizada) {
            throw new Error('Cita no encontrada después de actualización');
        }
        return citaActualizada;
    }
    static async cancelar(id, motivoCancelacion) {
        const query = `
            CALL CLINICA_PI3.CancelarCita(?, ?)
        `;
        await database_1.pool.query(query, [id, motivoCancelacion]);
    }
    static async eliminar(id) {
        const query = `
            CALL CLINICA_PI3.EliminarCita(?)
        `;
        await database_1.pool.query(query, [id]);
    }
    static async finalizar(id) {
        const query = `
            CALL CLINICA_PI3.FinalizarCitaConRegistro(?)
        `;
        const [result] = await database_1.pool.query(query, [id]);
        return result[0][0];
    }
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
    static async obtenerSedes() {
        const query = `
            SELECT * FROM CLINICA_PI3.SEDES
        `;
        const [rows] = await database_1.pool.query(query);
        return rows;
    }
    static async obtenerEspecialidades() {
        const query = `
            SELECT * FROM CLINICA_PI3.ESPECIALIDADES
        `;
        const [rows] = await database_1.pool.query(query);
        return rows;
    }
    static async obtenerServicios() {
        const query = `
            SELECT * FROM CLINICA_PI3.SERVICIOS
        `;
        const [rows] = await database_1.pool.query(query);
        return rows;
    }
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
//# sourceMappingURL=cita.model.js.map