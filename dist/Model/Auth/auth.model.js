"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../config/database");
const jwt = __importStar(require("jsonwebtoken"));
const jwt_1 = require("../../config/jwt");
class AuthModel {
    // Método para login
    static async login(loginData) {
        const { emailUsuario, pwdUsuario } = loginData;
        // Buscar usuario por email
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
      WHERE u.emailUsuario = ? AND u.estadoUsuario = 1
    `;
        const [rows] = await database_1.pool.query(query, [emailUsuario]);
        if (Array.isArray(rows) && rows.length === 0) {
            throw new Error('Usuario no encontrado');
        }
        const usuario = rows[0];
        // Verificar contraseña (comparando hash SHA2)
        const crypto = require('crypto');
        const hashedPassword = crypto.createHash('sha256').update(pwdUsuario).digest('hex');
        if (hashedPassword !== usuario.pwdUsuario) {
            throw new Error('Contraseña incorrecta');
        }
        return usuario;
    }
    // Método para registrar nuevo usuario
    static async register(registerData) {
        // Verificar si el usuario ya existe
        const usuarioExistentePorEmail = await this.obtenerPorEmail(registerData.emailUsuario);
        if (usuarioExistentePorEmail) {
            throw new Error('Ya existe un usuario con ese email');
        }
        const usuarioExistentePorDoc = await this.obtenerPorDocumento(registerData.numeroDocumento);
        if (usuarioExistentePorDoc) {
            throw new Error('Ya existe un usuario con ese número de documento');
        }
        // Hash de la contraseña usando SHA2
        const crypto = require('crypto');
        const hashedPassword = crypto.createHash('sha256').update(registerData.pwdUsuario).digest('hex');
        const query = `
      INSERT INTO CLINICA_PI3.USUARIOS 
      (tipoDocumento, numeroDocumento, nombreUsuario, apellidoUsuario, emailUsuario, 
      pwdUsuario, telefonoUsuario, direccionUsuario, fechaNacimiento, genero, idRol, idSede)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const [result] = await database_1.pool.query(query, [
            registerData.tipoDocumento,
            registerData.numeroDocumento,
            registerData.nombreUsuario,
            registerData.apellidoUsuario,
            registerData.emailUsuario,
            hashedPassword,
            registerData.telefonoUsuario,
            registerData.direccionUsuario,
            registerData.fechaNacimiento || null,
            registerData.genero || null,
            registerData.idRol,
            registerData.idSede || null
        ]);
        return result.insertId;
    }
    // Métodos auxiliares
    static async obtenerPorEmail(email) {
        const query = 'SELECT * FROM CLINICA_PI3.USUARIOS WHERE emailUsuario = ?';
        const [rows] = await database_1.pool.query(query, [email]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }
    static async obtenerPorDocumento(numeroDocumento) {
        const query = 'SELECT * FROM CLINICA_PI3.USUARIOS WHERE numeroDocumento = ?';
        const [rows] = await database_1.pool.query(query, [numeroDocumento]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }
    static generarToken(payload) {
        const secret = jwt_1.JWT_CONFIG.secret;
        return jwt.sign(payload, secret, {
            expiresIn: jwt_1.JWT_CONFIG.expiresIn
        });
    }
    static generarRefreshToken(payload) {
        const secret = jwt_1.JWT_CONFIG.secret;
        return jwt.sign(payload, secret, {
            expiresIn: jwt_1.JWT_CONFIG.refreshExpiresIn
        });
    }
    static verificarToken(token) {
        try {
            const secret = jwt_1.JWT_CONFIG.secret;
            return jwt.verify(token, secret);
        }
        catch (error) {
            throw new Error('Token inválido');
        }
    }
    static async obtenerUsuarioPorToken(token) {
        try {
            // Verificar y decodificar el token
            const decoded = this.verificarToken(token);
            if (!decoded || !decoded.idUsuario) {
                throw new Error('Token inválido: no contiene información de usuario');
            }
            // Buscar usuario por ID en la base de datos
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
      WHERE u.idUsuario = ? AND u.estadoUsuario = 1
    `;
            const [rows] = await database_1.pool.query(query, [decoded.idUsuario]);
            if (Array.isArray(rows) && rows.length > 0) {
                const usuario = rows[0];
                // Eliminar información sensible
                const { pwdUsuario, ...usuarioSinPassword } = usuario;
                return usuarioSinPassword;
            }
            return null;
        }
        catch (error) {
            console.error('Error al obtener usuario por token:', error);
            throw new Error('No se pudo obtener el usuario del token');
        }
    }
}
exports.default = AuthModel;
