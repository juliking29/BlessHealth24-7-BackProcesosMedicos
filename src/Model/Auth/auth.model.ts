import { pool } from '../../config/database';
import { LoginData, RegisterData } from '../../interfaces/Auth/auth.interface';
import * as jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../../config/jwt';

export default class AuthModel {
  
  // Método para login
  public static async login(loginData: LoginData): Promise<any> {
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
    
    const [rows]: any = await pool.query(query, [emailUsuario]);
    
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
  public static async register(registerData: RegisterData): Promise<number> {
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
    
    const [result]: any = await pool.query(query, [
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
  private static async obtenerPorEmail(email: string): Promise<any | null> {
    const query = 'SELECT * FROM CLINICA_PI3.USUARIOS WHERE emailUsuario = ?';
    const [rows]: any = await pool.query(query, [email]);
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
  }
  
  private static async obtenerPorDocumento(numeroDocumento: string): Promise<any | null> {
    const query = 'SELECT * FROM CLINICA_PI3.USUARIOS WHERE numeroDocumento = ?';
    const [rows]: any = await pool.query(query, [numeroDocumento]);
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
  }
  
 
  public static generarToken(payload: object | string | Buffer): string {
    const secret = JWT_CONFIG.secret as jwt.Secret;
    return jwt.sign(payload, secret, { 
      expiresIn: JWT_CONFIG.expiresIn 
    } as jwt.SignOptions);
  }

  public static generarRefreshToken(payload: object | string | Buffer): string {
    const secret = JWT_CONFIG.secret as jwt.Secret;
    return jwt.sign(payload, secret, { 
      expiresIn: JWT_CONFIG.refreshExpiresIn 
    } as jwt.SignOptions);
  }

  public static verificarToken(token: string): string | jwt.JwtPayload {
    try {
      const secret = JWT_CONFIG.secret as jwt.Secret;
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }


  
public static async obtenerUsuarioPorToken(token: string): Promise<any | null> {
  try {
    // Verificar y decodificar el token
    const decoded = this.verificarToken(token) as any;
    
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
    
    const [rows]: any = await pool.query(query, [decoded.idUsuario]);
    
    if (Array.isArray(rows) && rows.length > 0) {
      const usuario = rows[0];
      
      // Eliminar información sensible
      const { pwdUsuario, ...usuarioSinPassword } = usuario;
      return usuarioSinPassword;
    }
    
    return null;
  } catch (error) {
    console.error('Error al obtener usuario por token:', error);
    throw new Error('No se pudo obtener el usuario del token');
  }
}
}
