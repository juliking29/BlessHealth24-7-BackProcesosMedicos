// Model/medico/medico.model.ts
import { pool } from '../../config/database';
import Especialidad from '../../interfaces/Usuario/especialidad.interface.ts';
import Medico from '../../interfaces/Usuario/medico.interface';


export default class MedicoModel {

        // Método para obtener todos los médicos con información completa
        // Method to get all doctors with complete information
        public static async obtenerTodos(): Promise<any[]> {
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
            
            const [rows] = await pool.query(query);
            return rows as any[];
        }

        // Método para obtener médicos por especialidad
        // Method to get doctors by specialty
        public static async obtenerPorEspecialidad(idEspecialidad: number): Promise<any[]> {
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
            
            const [rows] = await pool.query(query, [idEspecialidad]);
            return rows as any[];
        }

        // Método para obtener médicos por sede
        // Method to get doctors by location
        public static async obtenerPorSede(idSede: number): Promise<any[]> {
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
            
            const [rows] = await pool.query(query, [idSede]);
            return rows as any[];
        }

        // Método para obtener un médico por su ID
        // Method to get a doctor by their ID
        public static async obtenerPorId(id: number): Promise<any | null> {
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

            const [rows]: any = await pool.query(query, [id]);

            if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
            }
            return null;
        }

        // Método para obtener un médico por número de documento
        // Method to get a doctor by document number
        public static async obtenerPorDocumento(numeroDocumento: string): Promise<any | null> {
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

            const [rows]: any = await pool.query(query, [numeroDocumento]);

            if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
            }
            return null;
        }

        // Método para obtener un médico por registro médico
        // Method to get a doctor by medical license
        public static async obtenerPorRegistroMedico(registroMedico: string): Promise<any | null> {
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

            const [rows]: any = await pool.query(query, [registroMedico]);

            if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
            }
            return null;
        }

        // Método para crear un médico (requiere que el usuario ya exista)
        // Method to create a doctor (requires the user to already exist)
        public static async crear(medico: Omit<Medico, 'nombreUsuario' | 'apellidoUsuario' | 'emailUsuario' | 'telefonoUsuario' | 'numeroDocumento' | 'especialidadNombre' | 'sedeNombre'>): Promise<void> {
            // Verificar que el usuario existe y tiene rol de médico (idRol = 2)
            const verificarUsuario = `
            SELECT idUsuario, idRol FROM CLINICA_PI3.USUARIOS 
            WHERE idUsuario = ? AND idRol = 2 AND estadoUsuario = 1
            `;
            
            const [userRows]: any = await pool.query(verificarUsuario, [medico.idMedico]);
            
            if (!Array.isArray(userRows) || userRows.length === 0) {
            throw new Error('El usuario no existe o no tiene rol de médico');
            }

            // Verificar que no exista ya un médico con ese ID
            const verificarMedico = `
            SELECT idMedico FROM CLINICA_PI3.MEDICOS WHERE idMedico = ?
            `;
            
            const [medicoRows]: any = await pool.query(verificarMedico, [medico.idMedico]);
            
            if (Array.isArray(medicoRows) && medicoRows.length > 0) {
            throw new Error('Ya existe un médico con ese ID de usuario');
            }

            // Insertar el médico
            const query = `
            INSERT INTO CLINICA_PI3.MEDICOS 
            (idMedico, idEspecialidad, registroMedico, universidad, anioGraduacion, estadoMedico)
            VALUES (?, ?, ?, ?, ?, ?)
            `;

            await pool.query(query, [
            medico.idMedico,
            medico.idEspecialidad,
            medico.registroMedico,
            medico.universidad,
            medico.anioGraduacion,
            medico.estadoMedico || 1
            ]);
        }

        // Método para actualizar la información de un médico
        // Method to update a doctor's information
        public static async actualizar(id: number, medico: Partial<Omit<Medico, 'idMedico' | 'nombreUsuario' | 'apellidoUsuario' | 'emailUsuario' | 'telefonoUsuario' | 'numeroDocumento' | 'especialidadNombre' | 'sedeNombre'>>): Promise<void> {
            // Construir la query dinámicamente según los campos proporcionados
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
            
            await pool.query(query, valores);
        }

        // Método para eliminar (desactivar) un médico
        // Method to delete (deactivate) a doctor
        public static async eliminar(id: number): Promise<void> {
            await pool.query(
            'UPDATE CLINICA_PI3.MEDICOS SET estadoMedico = 0 WHERE idMedico = ?',
            [id]
            );
        }

        // Método para eliminar físicamente un médico
        // Method to physically delete a doctor
        public static async eliminarFisicamente(id: number): Promise<void> {
            await pool.query(
            'DELETE FROM CLINICA_PI3.MEDICOS WHERE idMedico = ?',
            [id]
            );
        }

        // Método auxiliar para obtener especialidades
        // Auxiliary method to get specialties
        public static async obtenerEspecialidades(): Promise<Especialidad[]> {
            const [rows] = await pool.query('SELECT * FROM CLINICA_PI3.ESPECIALIDADES WHERE estadoEspecialidad = 1');
            return rows as Especialidad[];
        }

        // Método para buscar médicos por nombre
        // Method to search doctors by name
        public static async buscarPorNombre(nombre: string): Promise<any[]> {
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
            const [rows] = await pool.query(query, [searchTerm, searchTerm, searchTerm]);
            return rows as any[];
        }
}