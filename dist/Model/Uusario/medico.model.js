"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../config/database");
class MedicoModel {
    static async obtenerTodos() {
        const query = `
            SELECT 
                m.*,
                u.tipoDocumento,
                u.numeroDocumento,
                u.nombreUsuario,
                u.apellidoUsuario,
                u.emailUsuario,
                u.telefonoUsuario,
                u.direccionUsuario,
                u.fechaNacimiento,
                u.genero,
                u.idSede,
                u.estadoUsuario,
                u.fechaRegistro,
                e.nombreEspecialidad,
                e.descripcion as especialidadDescripcion,
                s.nombreSede,
                s.ciudadSede,
                td.nombreTipoDocumento,
                td.abreviatura as tipoDocumentoAbrev
            FROM CLINICA_PI3.MEDICOS m
            INNER JOIN CLINICA_PI3.USUARIOS u ON m.idMedico = u.idUsuario
            INNER JOIN CLINICA_PI3.ESPECIALIDADES e ON m.idEspecialidad = e.idEspecialidad
            LEFT JOIN CLINICA_PI3.SEDES s ON u.idSede = s.idSede
            LEFT JOIN CLINICA_PI3.TIPOS_DOCUMENTO td ON u.tipoDocumento = td.idTipoDocumento
            WHERE m.estadoMedico = 1 AND u.estadoUsuario = 1
            ORDER BY u.nombreUsuario, u.apellidoUsuario
            `;
        const [rows] = await database_1.pool.query(query);
        return rows;
    }
    static async obtenerPorEspecialidad(idEspecialidad) {
        const query = `
            SELECT 
                m.*,
                u.numeroDocumento,
                u.nombreUsuario,
                u.apellidoUsuario,
                u.emailUsuario,
                u.telefonoUsuario,
                e.nombreEspecialidad,
                s.nombreSede
            FROM CLINICA_PI3.MEDICOS m
            INNER JOIN CLINICA_PI3.USUARIOS u ON m.idMedico = u.idUsuario
            INNER JOIN CLINICA_PI3.ESPECIALIDADES e ON m.idEspecialidad = e.idEspecialidad
            LEFT JOIN CLINICA_PI3.SEDES s ON u.idSede = s.idSede
            WHERE m.idEspecialidad = ? AND m.estadoMedico = 1 AND u.estadoUsuario = 1
            `;
        const [rows] = await database_1.pool.query(query, [idEspecialidad]);
        return rows;
    }
    static async obtenerPorSede(idSede) {
        const query = `
            SELECT 
                m.*,
                u.numeroDocumento,
                u.nombreUsuario,
                u.apellidoUsuario,
                u.emailUsuario,
                u.telefonoUsuario,
                e.nombreEspecialidad,
                s.nombreSede
            FROM CLINICA_PI3.MEDICOS m
            INNER JOIN CLINICA_PI3.USUARIOS u ON m.idMedico = u.idUsuario
            INNER JOIN CLINICA_PI3.ESPECIALIDADES e ON m.idEspecialidad = e.idEspecialidad
            LEFT JOIN CLINICA_PI3.SEDES s ON u.idSede = s.idSede
            WHERE u.idSede = ? AND m.estadoMedico = 1 AND u.estadoUsuario = 1
            `;
        const [rows] = await database_1.pool.query(query, [idSede]);
        return rows;
    }
    static async obtenerPorId(id) {
        const query = `
            SELECT 
                m.*,
                u.tipoDocumento,
                u.numeroDocumento,
                u.nombreUsuario,
                u.apellidoUsuario,
                u.emailUsuario,
                u.telefonoUsuario,
                u.direccionUsuario,
                u.fechaNacimiento,
                u.genero,
                u.idSede,
                u.estadoUsuario,
                u.fechaRegistro,
                e.nombreEspecialidad,
                e.descripcion as especialidadDescripcion,
                s.nombreSede,
                s.ciudadSede,
                td.nombreTipoDocumento,
                td.abreviatura as tipoDocumentoAbrev
            FROM CLINICA_PI3.MEDICOS m
            INNER JOIN CLINICA_PI3.USUARIOS u ON m.idMedico = u.idUsuario
            INNER JOIN CLINICA_PI3.ESPECIALIDADES e ON m.idEspecialidad = e.idEspecialidad
            LEFT JOIN CLINICA_PI3.SEDES s ON u.idSede = s.idSede
            LEFT JOIN CLINICA_PI3.TIPOS_DOCUMENTO td ON u.tipoDocumento = td.idTipoDocumento
            WHERE m.idMedico = ?
            `;
        const [rows] = await database_1.pool.query(query, [id]);
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        }
        return null;
    }
    static async obtenerPorDocumento(numeroDocumento) {
        const query = `
            SELECT 
                m.*,
                u.tipoDocumento,
                u.numeroDocumento,
                u.nombreUsuario,
                u.apellidoUsuario,
                u.emailUsuario,
                u.telefonoUsuario,
                u.direccionUsuario,
                u.fechaNacimiento,
                u.genero,
                u.idSede,
                u.estadoUsuario,
                u.fechaRegistro,
                e.nombreEspecialidad,
                e.descripcion as especialidadDescripcion,
                s.nombreSede,
                s.ciudadSede,
                td.nombreTipoDocumento,
                td.abreviatura as tipoDocumentoAbrev
            FROM CLINICA_PI3.MEDICOS m
            INNER JOIN CLINICA_PI3.USUARIOS u ON m.idMedico = u.idUsuario
            INNER JOIN CLINICA_PI3.ESPECIALIDADES e ON m.idEspecialidad = e.idEspecialidad
            LEFT JOIN CLINICA_PI3.SEDES s ON u.idSede = s.idSede
            LEFT JOIN CLINICA_PI3.TIPOS_DOCUMENTO td ON u.tipoDocumento = td.idTipoDocumento
            WHERE u.numeroDocumento = ?
            `;
        const [rows] = await database_1.pool.query(query, [numeroDocumento]);
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        }
        return null;
    }
    static async obtenerPorRegistroMedico(registroMedico) {
        const query = `
            SELECT 
                m.*,
                u.numeroDocumento,
                u.nombreUsuario,
                u.apellidoUsuario,
                u.emailUsuario,
                u.telefonoUsuario,
                e.nombreEspecialidad,
                s.nombreSede
            FROM CLINICA_PI3.MEDICOS m
            INNER JOIN CLINICA_PI3.USUARIOS u ON m.idMedico = u.idUsuario
            INNER JOIN CLINICA_PI3.ESPECIALIDADES e ON m.idEspecialidad = e.idEspecialidad
            LEFT JOIN CLINICA_PI3.SEDES s ON u.idSede = s.idSede
            WHERE m.registroMedico = ?
            `;
        const [rows] = await database_1.pool.query(query, [registroMedico]);
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        }
        return null;
    }
    static async crear(medico) {
        const verificarUsuario = `
            SELECT idUsuario, idRol FROM CLINICA_PI3.USUARIOS 
            WHERE idUsuario = ? AND idRol = 2 AND estadoUsuario = 1
            `;
        const [userRows] = await database_1.pool.query(verificarUsuario, [medico.idMedico]);
        if (!Array.isArray(userRows) || userRows.length === 0) {
            throw new Error('El usuario no existe o no tiene rol de médico');
        }
        const verificarMedico = `
            SELECT idMedico FROM CLINICA_PI3.MEDICOS WHERE idMedico = ?
            `;
        const [medicoRows] = await database_1.pool.query(verificarMedico, [medico.idMedico]);
        if (Array.isArray(medicoRows) && medicoRows.length > 0) {
            throw new Error('Ya existe un médico con ese ID de usuario');
        }
        const query = `
            INSERT INTO CLINICA_PI3.MEDICOS 
            (idMedico, idEspecialidad, registroMedico, universidad, anioGraduacion, estadoMedico)
            VALUES (?, ?, ?, ?, ?, ?)
            `;
        await database_1.pool.query(query, [
            medico.idMedico,
            medico.idEspecialidad,
            medico.registroMedico,
            medico.universidad,
            medico.anioGraduacion,
            medico.estadoMedico || 1
        ]);
    }
    static async actualizar(id, medico) {
        const campos = [];
        const valores = [];
        if (medico.idEspecialidad !== undefined) {
            campos.push('idEspecialidad = ?');
            valores.push(medico.idEspecialidad);
        }
        if (medico.registroMedico !== undefined) {
            campos.push('registroMedico = ?');
            valores.push(medico.registroMedico);
        }
        if (medico.universidad !== undefined) {
            campos.push('universidad = ?');
            valores.push(medico.universidad);
        }
        if (medico.anioGraduacion !== undefined) {
            campos.push('anioGraduacion = ?');
            valores.push(medico.anioGraduacion);
        }
        if (medico.estadoMedico !== undefined) {
            campos.push('estadoMedico = ?');
            valores.push(medico.estadoMedico);
        }
        if (campos.length === 0) {
            throw new Error('No hay campos para actualizar');
        }
        valores.push(id);
        const query = `UPDATE CLINICA_PI3.MEDICOS SET ${campos.join(', ')} WHERE idMedico = ?`;
        await database_1.pool.query(query, valores);
    }
    static async eliminar(id) {
        await database_1.pool.query('UPDATE CLINICA_PI3.MEDICOS SET estadoMedico = 0 WHERE idMedico = ?', [id]);
    }
    static async eliminarFisicamente(id) {
        await database_1.pool.query('DELETE FROM CLINICA_PI3.MEDICOS WHERE idMedico = ?', [id]);
    }
    static async obtenerEspecialidades() {
        const [rows] = await database_1.pool.query('SELECT * FROM CLINICA_PI3.ESPECIALIDADES WHERE estadoEspecialidad = 1');
        return rows;
    }
    static async buscarPorNombre(nombre) {
        const query = `
            SELECT 
                m.*,
                u.numeroDocumento,
                u.nombreUsuario,
                u.apellidoUsuario,
                u.emailUsuario,
                u.telefonoUsuario,
                e.nombreEspecialidad,
                s.nombreSede
            FROM CLINICA_PI3.MEDICOS m
            INNER JOIN CLINICA_PI3.USUARIOS u ON m.idMedico = u.idUsuario
            INNER JOIN CLINICA_PI3.ESPECIALIDADES e ON m.idEspecialidad = e.idEspecialidad
            LEFT JOIN CLINICA_PI3.SEDES s ON u.idSede = s.idSede
            WHERE (u.nombreUsuario LIKE ? OR u.apellidoUsuario LIKE ? OR CONCAT(u.nombreUsuario, ' ', u.apellidoUsuario) LIKE ?)
                AND m.estadoMedico = 1 AND u.estadoUsuario = 1
            `;
        const searchTerm = `%${nombre}%`;
        const [rows] = await database_1.pool.query(query, [searchTerm, searchTerm, searchTerm]);
        return rows;
    }
}
exports.default = MedicoModel;
//# sourceMappingURL=medico.model.js.map