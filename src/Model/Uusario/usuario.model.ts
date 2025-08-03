// Model/usuario/usuario.model.ts
import { pool } from '../../config/database';
import Rol from '../../interfaces/Usuario/rol.interface';
import Sede from '../../interfaces/Usuario/sede.interface';
import TipoDocumento from '../../interfaces/Usuario/tipoDocumento.interface';
import Usuario from '../../interfaces/Usuario/usuario.interface';


export default class UsuarioModel {

  // Método para obtener todos los usuarios con información relacionada
  // Method to get all users with related information
    public static async obtenerTodos(): Promise<any[]> {
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
        
        const [rows] = await pool.query(query);
        return rows as any[];
    }

  // Método para obtener usuarios por rol
  // Method to get users by role
    public static async obtenerPorRol(idRol: number): Promise<any[]> {
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
        
        const [rows] = await pool.query(query, [idRol]);
        return rows as any[];
    }

  // Método para obtener un usuario por su ID
    // Method to get a user by their ID
    public static async obtenerPorId(id: number): Promise<any | null> {
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

        const [rows]: any = await pool.query(query, [id]);

        if (Array.isArray(rows) && rows.length > 0) {
        return rows[0];
        }
        return null;
    }

    // Método para obtener un usuario por número de documento
    // Method to get a user by document number
    public static async obtenerPorDocumento(numeroDocumento: string): Promise<any | null> {
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

        const [rows]: any = await pool.query(query, [numeroDocumento]);

        if (Array.isArray(rows) && rows.length > 0) {
        return rows[0];
        }
        return null;
    }

    // Método para obtener un usuario por email
    // Method to get a user by email
    public static async obtenerPorEmail(email: string): Promise<any | null> {
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

        const [rows]: any = await pool.query(query, [email]);

        if (Array.isArray(rows) && rows.length > 0) {
        return rows[0];
        }
        return null;
    }

    // Método para insertar un nuevo usuario
    // Method to insert a new user
    public static async crear(usuario: Usuario): Promise<number> {
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

        const [result]: any = await pool.query(query, [
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

        public static async actualizar(id: number, usuario: Partial<Usuario>): Promise<Usuario> {
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
            
            await pool.query(query, valores);
            
            // Obtener y devolver el usuario actualizado
            const usuarioActualizado = await this.obtenerPorId(id);
            if (!usuarioActualizado) {
                throw new Error('Usuario no encontrado después de actualización');
            }
            
            return usuarioActualizado;
        }

    // Método para eliminar (desactivar) un usuario
    // Method to delete (deactivate) a user
    public static async eliminar(id: number): Promise<void> {
        await pool.query(
        'UPDATE CLINICA_PI3.USUARIOS SET estadoUsuario = 0 WHERE idUsuario = ?',
        [id]
        );
    }

    // Método para eliminar físicamente un usuario
    // Method to physically delete a user
    public static async eliminarFisicamente(id: number): Promise<void> {
        await pool.query(
        'DELETE FROM CLINICA_PI3.USUARIOS WHERE idUsuario = ?',
        [id]
        );
    }

    // Métodos auxiliares para obtener datos relacionados
    // Auxiliary methods to get related data

    public static async obtenerTiposDocumento(): Promise<TipoDocumento[]> {
        const [rows] = await pool.query('SELECT * FROM CLINICA_PI3.TIPOS_DOCUMENTO WHERE estado = 1');
        return rows as TipoDocumento[];
    }

    public static async obtenerRoles(): Promise<Rol[]> {
        const [rows] = await pool.query('SELECT * FROM CLINICA_PI3.ROLES WHERE estadoRol = 1');
        return rows as Rol[];
    }

    public static async obtenerSedes(): Promise<Sede[]> {
        const [rows] = await pool.query('SELECT * FROM CLINICA_PI3.SEDES WHERE estadoSede = 1');
        return rows as Sede[];
    }
}