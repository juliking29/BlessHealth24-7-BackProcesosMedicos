"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../config/database");
class RegistroConsultaModel {
    static async crear(registro) {
        const query = `
            INSERT INTO CLINICA_PI3.REGISTROS_CONSULTAS (
                idHistoriaClinica, idMedico, idCita, fechaConsulta,
                motivoConsulta, sintomas, diagnostico, tratamiento,
                observaciones, presionArterial, frecuenciaCardiaca,
                temperatura, peso, altura
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await database_1.pool.query(query, [
            registro.idHistoriaClinica,
            registro.idMedico,
            registro.idCita || null,
            registro.fechaConsulta,
            registro.motivoConsulta,
            registro.sintomas || null,
            registro.diagnostico || null,
            registro.tratamiento || null,
            registro.observaciones || null,
            registro.presionArterial || null,
            registro.frecuenciaCardiaca || null,
            registro.temperatura || null,
            registro.peso || null,
            registro.altura || null
        ]);
        return result.insertId;
    }
    static async obtenerTodos() {
        const query = `
            SELECT 
                rc.*,
                CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
                CONCAT(m.nombreUsuario, ' ', m.apellidoUsuario) AS nombreMedico,
                e.nombreEspecialidad AS especialidadMedico,
                p.numeroDocumento AS numeroDocumentoPaciente,
                m.numeroDocumento AS numeroDocumentoMedico,
                c.estadoCita
            FROM CLINICA_PI3.REGISTROS_CONSULTAS rc
            JOIN CLINICA_PI3.HISTORIAS_CLINICAS hc ON rc.idHistoriaClinica = hc.idHistoriaClinica
            JOIN CLINICA_PI3.USUARIOS p ON hc.idPaciente = p.idUsuario
            JOIN CLINICA_PI3.MEDICOS med ON rc.idMedico = med.idMedico
            JOIN CLINICA_PI3.USUARIOS m ON med.idMedico = m.idUsuario
            JOIN CLINICA_PI3.ESPECIALIDADES e ON med.idEspecialidad = e.idEspecialidad
            LEFT JOIN CLINICA_PI3.CITAS c ON rc.idCita = c.idCita
            ORDER BY rc.fechaConsulta DESC
        `;
        const [rows] = await database_1.pool.query(query);
        return rows;
    }
    static async obtenerPorCedulaPaciente(numeroDocumento) {
        const query = `
            SELECT 
                rc.*,
                CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
                CONCAT(m.nombreUsuario, ' ', m.apellidoUsuario) AS nombreMedico,
                e.nombreEspecialidad AS especialidadMedico,
                p.numeroDocumento AS numeroDocumentoPaciente,
                m.numeroDocumento AS numeroDocumentoMedico,
                c.estadoCita
            FROM CLINICA_PI3.REGISTROS_CONSULTAS rc
            JOIN CLINICA_PI3.HISTORIAS_CLINICAS hc ON rc.idHistoriaClinica = hc.idHistoriaClinica
            JOIN CLINICA_PI3.USUARIOS p ON hc.idPaciente = p.idUsuario
            JOIN CLINICA_PI3.MEDICOS med ON rc.idMedico = med.idMedico
            JOIN CLINICA_PI3.USUARIOS m ON med.idMedico = m.idUsuario
            JOIN CLINICA_PI3.ESPECIALIDADES e ON med.idEspecialidad = e.idEspecialidad
            LEFT JOIN CLINICA_PI3.CITAS c ON rc.idCita = c.idCita
            WHERE p.numeroDocumento = ?
            ORDER BY rc.fechaConsulta DESC
        `;
        const [rows] = await database_1.pool.query(query, [numeroDocumento]);
        return rows;
    }
    static async obtenerPorIdCita(idCita) {
        const query = `
            SELECT 
                rc.*,
                CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
                CONCAT(m.nombreUsuario, ' ', m.apellidoUsuario) AS nombreMedico,
                e.nombreEspecialidad AS especialidadMedico,
                p.numeroDocumento AS numeroDocumentoPaciente,
                m.numeroDocumento AS numeroDocumentoMedico,
                c.estadoCita
            FROM CLINICA_PI3.REGISTROS_CONSULTAS rc
            JOIN CLINICA_PI3.HISTORIAS_CLINICAS hc ON rc.idHistoriaClinica = hc.idHistoriaClinica
            JOIN CLINICA_PI3.USUARIOS p ON hc.idPaciente = p.idUsuario
            JOIN CLINICA_PI3.MEDICOS med ON rc.idMedico = med.idMedico
            JOIN CLINICA_PI3.USUARIOS m ON med.idMedico = m.idUsuario
            JOIN CLINICA_PI3.ESPECIALIDADES e ON med.idEspecialidad = e.idEspecialidad
            LEFT JOIN CLINICA_PI3.CITAS c ON rc.idCita = c.idCita
            WHERE rc.idCita = ?
            ORDER BY rc.fechaConsulta DESC
        `;
        const [rows] = await database_1.pool.query(query, [idCita]);
        return rows;
    }
    static async obtenerPorId(id) {
        const query = `
            SELECT 
                rc.*,
                CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
                CONCAT(m.nombreUsuario, ' ', m.apellidoUsuario) AS nombreMedico,
                e.nombreEspecialidad AS especialidadMedico,
                p.numeroDocumento AS numeroDocumentoPaciente,
                m.numeroDocumento AS numeroDocumentoMedico,
                c.estadoCita
            FROM CLINICA_PI3.REGISTROS_CONSULTAS rc
            JOIN CLINICA_PI3.HISTORIAS_CLINICAS hc ON rc.idHistoriaClinica = hc.idHistoriaClinica
            JOIN CLINICA_PI3.USUARIOS p ON hc.idPaciente = p.idUsuario
            JOIN CLINICA_PI3.MEDICOS med ON rc.idMedico = med.idMedico
            JOIN CLINICA_PI3.USUARIOS m ON med.idMedico = m.idUsuario
            JOIN CLINICA_PI3.ESPECIALIDADES e ON med.idEspecialidad = e.idEspecialidad
            LEFT JOIN CLINICA_PI3.CITAS c ON rc.idCita = c.idCita
            WHERE rc.idRegistroConsulta = ?
        `;
        const [rows] = await database_1.pool.query(query, [id]);
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        }
        return null;
    }
    static async actualizar(id, registro) {
        const campos = [];
        const valores = [];
        if (registro.motivoConsulta !== undefined) {
            campos.push('motivoConsulta = ?');
            valores.push(registro.motivoConsulta);
        }
        if (registro.sintomas !== undefined) {
            campos.push('sintomas = ?');
            valores.push(registro.sintomas);
        }
        if (registro.diagnostico !== undefined) {
            campos.push('diagnostico = ?');
            valores.push(registro.diagnostico);
        }
        if (registro.tratamiento !== undefined) {
            campos.push('tratamiento = ?');
            valores.push(registro.tratamiento);
        }
        if (registro.observaciones !== undefined) {
            campos.push('observaciones = ?');
            valores.push(registro.observaciones);
        }
        if (registro.presionArterial !== undefined) {
            campos.push('presionArterial = ?');
            valores.push(registro.presionArterial);
        }
        if (registro.frecuenciaCardiaca !== undefined) {
            campos.push('frecuenciaCardiaca = ?');
            valores.push(registro.frecuenciaCardiaca);
        }
        if (registro.temperatura !== undefined) {
            campos.push('temperatura = ?');
            valores.push(registro.temperatura);
        }
        if (registro.peso !== undefined) {
            campos.push('peso = ?');
            valores.push(registro.peso);
        }
        if (registro.altura !== undefined) {
            campos.push('altura = ?');
            valores.push(registro.altura);
        }
        if (campos.length === 0) {
            throw new Error('No hay campos para actualizar');
        }
        valores.push(id);
        const query = `UPDATE CLINICA_PI3.REGISTROS_CONSULTAS SET ${campos.join(', ')} WHERE idRegistroConsulta = ?`;
        await database_1.pool.query(query, valores);
    }
    static async eliminar(id) {
        await database_1.pool.query('DELETE FROM CLINICA_PI3.REGISTROS_CONSULTAS WHERE idRegistroConsulta = ?', [id]);
    }
}
exports.default = RegistroConsultaModel;
//# sourceMappingURL=registroConsulta.model.js.map