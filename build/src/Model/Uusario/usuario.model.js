"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Model/usuario/usuario.model.ts
const database_1 = require("../../config/database");
class UsuarioModel {
    // Método para obtener todos los usuarios con información relacionada
    // Method to get all users with related information
    static async obtenerTodos() {
        const query = `
        SELECT 
            u.*,
            td.nombreTipoDocumento,
            td.abreviatura as tipoDocumentoAbrev,
            r.nombreRol,
            s.nombreSede,
            s.ciudadSede
        FROM CLINICA_PI3.USUARIOS u
        LEFT JOIN CLINICA_PI3.TIPOS_DOCUMENTO td ON u.tipoDocumento = td.idTipoDocumento
        LEFT JOIN CLINICA_PI3.ROLES r ON u.idRol = r.idRol
        LEFT JOIN CLINICA_PI3.SEDES s ON u.idSede = s.idSede
        WHERE u.estadoUsuario = 1
        ORDER BY u.idUsuario 
        `;
        const [rows] = await database_1.pool.query(query);
        return rows;
    }
    // Método para obtener usuarios por rol
    // Method to get users by role
    static async obtenerPorRol(idRol) {
        const query = `
        SELECT 
            u.*,
            td.nombreTipoDocumento,
            r.nombreRol,
            s.nombreSede
        FROM CLINICA_PI3.USUARIOS u
        LEFT JOIN CLINICA_PI3.TIPOS_DOCUMENTO td ON u.tipoDocumento = td.idTipoDocumento
        LEFT JOIN CLINICA_PI3.ROLES r ON u.idRol = r.idRol
        LEFT JOIN CLINICA_PI3.SEDES s ON u.idSede = s.idSede
        WHERE u.idRol = ? AND u.estadoUsuario = 1
        `;
        const [rows] = await database_1.pool.query(query, [idRol]);
        return rows;
    }
    // Método para obtener un usuario por su ID
    // Method to get a user by their ID
    static async obtenerPorId(id) {
        const query = `
        SELECT 
            u.*,
            td.nombreTipoDocumento,
            td.abreviatura as tipoDocumentoAbrev,
            r.nombreRol,
            s.nombreSede,
            s.ciudadSede
        FROM CLINICA_PI3.USUARIOS u
        LEFT JOIN CLINICA_PI3.TIPOS_DOCUMENTO td ON u.tipoDocumento = td.idTipoDocumento
        LEFT JOIN CLINICA_PI3.ROLES r ON u.idRol = r.idRol
        LEFT JOIN CLINICA_PI3.SEDES s ON u.idSede = s.idSede
        WHERE u.idUsuario = ?
        `;
        const [rows] = await database_1.pool.query(query, [id]);
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        }
        return null;
    }
    // Método para obtener un usuario por número de documento
    // Method to get a user by document number
    static async obtenerPorDocumento(numeroDocumento) {
        const query = `
        SELECT 
            u.*,
            td.nombreTipoDocumento,
            r.nombreRol,
            s.nombreSede
        FROM CLINICA_PI3.USUARIOS u
        LEFT JOIN CLINICA_PI3.TIPOS_DOCUMENTO td ON u.tipoDocumento = td.idTipoDocumento
        LEFT JOIN CLINICA_PI3.ROLES r ON u.idRol = r.idRol
        LEFT JOIN CLINICA_PI3.SEDES s ON u.idSede = s.idSede
        WHERE u.numeroDocumento = ?
        `;
        const [rows] = await database_1.pool.query(query, [numeroDocumento]);
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        }
        return null;
    }
    // Método para obtener un usuario por email
    // Method to get a user by email
    static async obtenerPorEmail(email) {
        const query = `
        SELECT 
            u.*,
            td.nombreTipoDocumento,
            r.nombreRol,
            s.nombreSede
        FROM CLINICA_PI3.USUARIOS u
        LEFT JOIN CLINICA_PI3.TIPOS_DOCUMENTO td ON u.tipoDocumento = td.idTipoDocumento
        LEFT JOIN CLINICA_PI3.ROLES r ON u.idRol = r.idRol
        LEFT JOIN CLINICA_PI3.SEDES s ON u.idSede = s.idSede
        WHERE u.emailUsuario = ?
        `;
        const [rows] = await database_1.pool.query(query, [email]);
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        }
        return null;
    }
    // Método para insertar un nuevo usuario
    // Method to insert a new user
    static async crear(usuario) {
        // Encriptar la contraseña usando SHA2
        const usuarioConPassword = {
            ...usuario,
            pwdUsuario: usuario.pwdUsuario ? `SHA2('${usuario.pwdUsuario}', 256)` : null
        };
        const query = `
        INSERT INTO CLINICA_PI3.USUARIOS 
        (tipoDocumento, numeroDocumento, nombreUsuario, apellidoUsuario, emailUsuario, 
        pwdUsuario, telefonoUsuario, direccionUsuario, fechaNacimiento, genero, idRol, idSede)
        VALUES (?, ?, ?, ?, ?, ${usuarioConPassword.pwdUsuario}, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await database_1.pool.query(query, [
            usuario.tipoDocumento,
            usuario.numeroDocumento,
            usuario.nombreUsuario,
            usuario.apellidoUsuario,
            usuario.emailUsuario,
            usuario.telefonoUsuario,
            usuario.direccionUsuario,
            usuario.fechaNacimiento || null,
            usuario.genero || null,
            usuario.idRol,
            usuario.idSede || null
        ]);
        return result.insertId;
    }
    // Método para actualizar la información de un usuario
    // Method to update a user's information
    static async actualizar(id, usuario) {
        // Construir la query dinámicamente según los campos proporcionados
        const campos = [];
        const valores = [];
        if (usuario.tipoDocumento !== undefined) {
            campos.push('tipoDocumento = ?');
            valores.push(usuario.tipoDocumento);
        }
        if (usuario.numeroDocumento !== undefined) {
            campos.push('numeroDocumento = ?');
            valores.push(usuario.numeroDocumento);
        }
        if (usuario.nombreUsuario !== undefined) {
            campos.push('nombreUsuario = ?');
            valores.push(usuario.nombreUsuario);
        }
        if (usuario.apellidoUsuario !== undefined) {
            campos.push('apellidoUsuario = ?');
            valores.push(usuario.apellidoUsuario);
        }
        if (usuario.emailUsuario !== undefined) {
            campos.push('emailUsuario = ?');
            valores.push(usuario.emailUsuario);
        }
        if (usuario.pwdUsuario !== undefined) {
            campos.push('pwdUsuario = SHA2(?, 256)');
            valores.push(usuario.pwdUsuario);
        }
        if (usuario.telefonoUsuario !== undefined) {
            campos.push('telefonoUsuario = ?');
            valores.push(usuario.telefonoUsuario);
        }
        if (usuario.direccionUsuario !== undefined) {
            campos.push('direccionUsuario = ?');
            valores.push(usuario.direccionUsuario);
        }
        if (usuario.fechaNacimiento !== undefined) {
            campos.push('fechaNacimiento = ?');
            valores.push(usuario.fechaNacimiento);
        }
        if (usuario.genero !== undefined) {
            campos.push('genero = ?');
            valores.push(usuario.genero);
        }
        if (usuario.idRol !== undefined) {
            campos.push('idRol = ?');
            valores.push(usuario.idRol);
        }
        if (usuario.idSede !== undefined) {
            campos.push('idSede = ?');
            valores.push(usuario.idSede);
        }
        if (usuario.estadoUsuario !== undefined) {
            campos.push('estadoUsuario = ?');
            valores.push(usuario.estadoUsuario);
        }
        if (campos.length === 0) {
            throw new Error('No hay campos para actualizar');
        }
        valores.push(id);
        const query = `UPDATE CLINICA_PI3.USUARIOS SET ${campos.join(', ')} WHERE idUsuario = ?`;
        await database_1.pool.query(query, valores);
        // Obtener y devolver el usuario actualizado
        const usuarioActualizado = await this.obtenerPorId(id);
        if (!usuarioActualizado) {
            throw new Error('Usuario no encontrado después de actualización');
        }
        return usuarioActualizado;
    }
    // Método para eliminar (desactivar) un usuario
    // Method to delete (deactivate) a user
    static async eliminar(id) {
        await database_1.pool.query('UPDATE CLINICA_PI3.USUARIOS SET estadoUsuario = 0 WHERE idUsuario = ?', [id]);
    }
    // Método para eliminar físicamente un usuario
    // Method to physically delete a user
    static async eliminarFisicamente(id) {
        await database_1.pool.query('DELETE FROM CLINICA_PI3.USUARIOS WHERE idUsuario = ?', [id]);
    }
    // Métodos auxiliares para obtener datos relacionados
    // Auxiliary methods to get related data
    static async obtenerTiposDocumento() {
        const [rows] = await database_1.pool.query('SELECT * FROM CLINICA_PI3.TIPOS_DOCUMENTO WHERE estado = 1');
        return rows;
    }
    static async obtenerRoles() {
        const [rows] = await database_1.pool.query('SELECT * FROM CLINICA_PI3.ROLES WHERE estadoRol = 1');
        return rows;
    }
    static async obtenerSedes() {
        const [rows] = await database_1.pool.query('SELECT * FROM CLINICA_PI3.SEDES WHERE estadoSede = 1');
        return rows;
    }
}
exports.default = UsuarioModel;
