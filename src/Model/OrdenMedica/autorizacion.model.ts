// Model/Autorizacion/autorizacion.model.ts

import { pool } from '../../config/database';
import { Autorizacion, AutorizacionCompleta, FiltroAutorizaciones } from '../../interfaces/OrdenMedica/ordenMedica.interface';

export default class AutorizacionModel {
    // Crear una nueva autorización
    public static async crear(autorizacion: Autorizacion): Promise<number> {
        const query = `
            INSERT INTO CLINICA_PI3.AUTORIZACIONES 
            (idOrdenMedica, idAutorizador, estadoAutorizacion, observaciones)
            VALUES (?, ?, ?, ?)
        `;

        const [result]: any = await pool.query(query, [
            autorizacion.idOrdenMedica,
            autorizacion.idAutorizador,
            autorizacion.estadoAutorizacion,
            autorizacion.observaciones || null
        ]);

        return result.insertId;
    }

    // Obtener todas las autorizaciones
    public static async obtenerTodas(): Promise<AutorizacionCompleta[]> {
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
        
        const [rows] = await pool.query(query);
        return rows as AutorizacionCompleta[];
    }

    // Obtener autorizaciones por orden médica
    public static async obtenerPorOrdenMedica(idOrdenMedica: number): Promise<AutorizacionCompleta[]> {
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
        
        const [rows] = await pool.query(query, [idOrdenMedica]);
        return rows as AutorizacionCompleta[];
    }

    // Obtener una autorización por ID
    public static async obtenerPorId(id: number): Promise<AutorizacionCompleta | null> {
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

        const [rows]: any = await pool.query(query, [id]);

        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        }
        return null;
    }

    // Actualizar una autorización
    public static async actualizar(id: number, autorizacion: Partial<Autorizacion>): Promise<void> {
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
        await pool.query(query, valores);
    }

    // Eliminar una autorización
    public static async eliminar(id: number): Promise<void> {
        await pool.query(
            'DELETE FROM CLINICA_PI3.AUTORIZACIONES WHERE idAutorizacion = ?',
            [id]
        );
    }


    public static async obtenerPorCedulaPaciente(numeroDocumento: string): Promise<AutorizacionCompleta[]> {
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
    
    const [rows] = await pool.query(query, [numeroDocumento]);
    return rows as AutorizacionCompleta[];
}

public static async obtenerConFiltros(filtros: FiltroAutorizaciones): Promise<AutorizacionCompleta[]> {
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
    
    const [rows] = await pool.query(query, params);
    return rows as AutorizacionCompleta[];
}

public static async obtenerPorCedulaDoctor(numeroDocumento: string): Promise<AutorizacionCompleta[]> {
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
    
    const [rows] = await pool.query(query, [numeroDocumento]);
    return rows as AutorizacionCompleta[];
}
}