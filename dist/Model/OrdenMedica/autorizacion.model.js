"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../config/database");
class AutorizacionModel {
    static async crear(autorizacion) {
        const query = `
            INSERT INTO CLINICA_PI3.AUTORIZACIONES 
            (idOrdenMedica, idAutorizador, estadoAutorizacion, observaciones)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await database_1.pool.query(query, [
            autorizacion.idOrdenMedica,
            autorizacion.idAutorizador,
            autorizacion.estadoAutorizacion,
            autorizacion.observaciones || null
        ]);
        return result.insertId;
    }
    static async obtenerTodas() {
        const query = `
            SELECT 
                a.*,
                CONCAT(u.nombreUsuario, ' ', u.apellidoUsuario) AS nombreAutorizador,
                CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
                om.tipoOrden,
                om.descripcion AS descripcionOrden
            FROM CLINICA_PI3.AUTORIZACIONES a
            JOIN CLINICA_PI3.USUARIOS u ON a.idAutorizador = u.idUsuario
            JOIN CLINICA_PI3.ORDENES_MEDICAS om ON a.idOrdenMedica = om.idOrdenMedica
            JOIN CLINICA_PI3.REGISTROS_CONSULTAS rc ON om.idRegistroConsulta = rc.idRegistroConsulta
            JOIN CLINICA_PI3.CITAS c ON rc.idCita = c.idCita
            JOIN CLINICA_PI3.USUARIOS p ON c.idPaciente = p.idUsuario
            ORDER BY a.fechaAutorizacion DESC
        `;
        const [rows] = await database_1.pool.query(query);
        return rows;
    }
    static async obtenerPorOrdenMedica(idOrdenMedica) {
        const query = `
            SELECT 
                a.*,
                CONCAT(u.nombreUsuario, ' ', u.apellidoUsuario) AS nombreAutorizador,
                CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
                om.tipoOrden,
                om.descripcion AS descripcionOrden
            FROM CLINICA_PI3.AUTORIZACIONES a
            JOIN CLINICA_PI3.USUARIOS u ON a.idAutorizador = u.idUsuario
            JOIN CLINICA_PI3.ORDENES_MEDICAS om ON a.idOrdenMedica = om.idOrdenMedica
            JOIN CLINICA_PI3.REGISTROS_CONSULTAS rc ON om.idRegistroConsulta = rc.idRegistroConsulta
            JOIN CLINICA_PI3.CITAS c ON rc.idCita = c.idCita
            JOIN CLINICA_PI3.USUARIOS p ON c.idPaciente = p.idUsuario
            WHERE a.idOrdenMedica = ?
            ORDER BY a.fechaAutorizacion DESC
        `;
        const [rows] = await database_1.pool.query(query, [idOrdenMedica]);
        return rows;
    }
    static async obtenerPorId(id) {
        const query = `
            SELECT 
                a.*,
                CONCAT(u.nombreUsuario, ' ', u.apellidoUsuario) AS nombreAutorizador,
                CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
                om.tipoOrden,
                om.descripcion AS descripcionOrden
            FROM CLINICA_PI3.AUTORIZACIONES a
            JOIN CLINICA_PI3.USUARIOS u ON a.idAutorizador = u.idUsuario
            JOIN CLINICA_PI3.ORDENES_MEDICAS om ON a.idOrdenMedica = om.idOrdenMedica
            JOIN CLINICA_PI3.REGISTROS_CONSULTAS rc ON om.idRegistroConsulta = rc.idRegistroConsulta
            JOIN CLINICA_PI3.CITAS c ON rc.idCita = c.idCita
            JOIN CLINICA_PI3.USUARIOS p ON c.idPaciente = p.idUsuario
            WHERE a.idAutorizacion = ?
        `;
        const [rows] = await database_1.pool.query(query, [id]);
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        }
        return null;
    }
    static async actualizar(id, autorizacion) {
        const campos = [];
        const valores = [];
        if (autorizacion.estadoAutorizacion !== undefined) {
            campos.push('estadoAutorizacion = ?');
            valores.push(autorizacion.estadoAutorizacion);
        }
        if (autorizacion.observaciones !== undefined) {
            campos.push('observaciones = ?');
            valores.push(autorizacion.observaciones);
        }
        if (campos.length === 0) {
            throw new Error('No hay campos para actualizar');
        }
        valores.push(id);
        const query = `UPDATE CLINICA_PI3.AUTORIZACIONES SET ${campos.join(', ')} WHERE idAutorizacion = ?`;
        await database_1.pool.query(query, valores);
    }
    static async eliminar(id) {
        await database_1.pool.query('DELETE FROM CLINICA_PI3.AUTORIZACIONES WHERE idAutorizacion = ?', [id]);
    }
    static async obtenerPorCedulaPaciente(numeroDocumento) {
        const query = `
        SELECT 
            a.*,
            CONCAT(u.nombreUsuario, ' ', u.apellidoUsuario) AS nombreAutorizador,
            CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
            om.tipoOrden,
            om.descripcion AS descripcionOrden
        FROM CLINICA_PI3.AUTORIZACIONES a
        JOIN CLINICA_PI3.USUARIOS u ON a.idAutorizador = u.idUsuario
        JOIN CLINICA_PI3.ORDENES_MEDICAS om ON a.idOrdenMedica = om.idOrdenMedica
        JOIN CLINICA_PI3.REGISTROS_CONSULTAS rc ON om.idRegistroConsulta = rc.idRegistroConsulta
        JOIN CLINICA_PI3.CITAS c ON rc.idCita = c.idCita
        JOIN CLINICA_PI3.USUARIOS p ON c.idPaciente = p.idUsuario
        WHERE p.numeroDocumento = ?
        ORDER BY a.fechaAutorizacion DESC
    `;
        const [rows] = await database_1.pool.query(query, [numeroDocumento]);
        return rows;
    }
    static async obtenerConFiltros(filtros) {
        let query = `
        SELECT 
            a.*,
            CONCAT(u.nombreUsuario, ' ', u.apellidoUsuario) AS nombreAutorizador,
            CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
            om.tipoOrden,
            om.descripcion AS descripcionOrden
        FROM CLINICA_PI3.AUTORIZACIONES a
        JOIN CLINICA_PI3.USUARIOS u ON a.idAutorizador = u.idUsuario
        JOIN CLINICA_PI3.ORDENES_MEDICAS om ON a.idOrdenMedica = om.idOrdenMedica
        JOIN CLINICA_PI3.REGISTROS_CONSULTAS rc ON om.idRegistroConsulta = rc.idRegistroConsulta
        JOIN CLINICA_PI3.CITAS c ON rc.idCita = c.idCita
        JOIN CLINICA_PI3.USUARIOS p ON c.idPaciente = p.idUsuario
        WHERE 1=1
    `;
        const params = [];
        if (filtros.numeroDocumento) {
            query += ' AND p.numeroDocumento = ?';
            params.push(filtros.numeroDocumento);
        }
        if (filtros.idPaciente) {
            query += ' AND c.idPaciente = ?';
            params.push(filtros.idPaciente);
        }
        if (filtros.estadoAutorizacion) {
            query += ' AND a.estadoAutorizacion = ?';
            params.push(filtros.estadoAutorizacion);
        }
        if (filtros.fechaInicio) {
            query += ' AND DATE(a.fechaAutorizacion) >= ?';
            params.push(filtros.fechaInicio);
        }
        if (filtros.fechaFin) {
            query += ' AND DATE(a.fechaAutorizacion) <= ?';
            params.push(filtros.fechaFin);
        }
        query += ' ORDER BY a.fechaAutorizacion DESC';
        const [rows] = await database_1.pool.query(query, params);
        return rows;
    }
    static async obtenerPorCedulaDoctor(numeroDocumento) {
        const query = `
        SELECT 
            a.*,
            CONCAT(u.nombreUsuario, ' ', u.apellidoUsuario) AS nombreAutorizador,
            CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
            om.tipoOrden,
            om.descripcion AS descripcionOrden
        FROM CLINICA_PI3.AUTORIZACIONES a
        JOIN CLINICA_PI3.USUARIOS u ON a.idAutorizador = u.idUsuario
        JOIN CLINICA_PI3.ORDENES_MEDICAS om ON a.idOrdenMedica = om.idOrdenMedica
        JOIN CLINICA_PI3.REGISTROS_CONSULTAS rc ON om.idRegistroConsulta = rc.idRegistroConsulta
        JOIN CLINICA_PI3.CITAS c ON rc.idCita = c.idCita
        JOIN CLINICA_PI3.USUARIOS p ON c.idPaciente = p.idUsuario
        WHERE u.numeroDocumento = ?
        ORDER BY a.fechaAutorizacion DESC
    `;
        const [rows] = await database_1.pool.query(query, [numeroDocumento]);
        return rows;
    }
}
exports.default = AutorizacionModel;
//# sourceMappingURL=autorizacion.model.js.map