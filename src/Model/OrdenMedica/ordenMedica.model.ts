// Model/OrdenMedica/ordenMedica.model.ts

import { pool } from '../../config/database';
import { FiltroOrdenes, OrdenMedica, OrdenMedicaCompleta } from '../../interfaces/OrdenMedica/ordenMedica.interface';

export default class OrdenMedicaModel {
    // Crear una nueva orden médica
    public static async crear(ordenMedica: OrdenMedica): Promise<number> {
        const query = `
            INSERT INTO CLINICA_PI3.ORDENES_MEDICAS 
            (idRegistroConsulta, tipoOrden, descripcion, fechaVencimiento, estadoOrden, observaciones)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [result]: any = await pool.query(query, [
            ordenMedica.idRegistroConsulta,
            ordenMedica.tipoOrden,
            ordenMedica.descripcion,
            ordenMedica.fechaVencimiento || null,
            ordenMedica.estadoOrden || 'Pendiente',
            ordenMedica.observaciones || null
        ]);

        return result.insertId;
    }

    // Obtener todas las órdenes médicas
    public static async obtenerTodas(): Promise<OrdenMedicaCompleta[]> {
        const query = `
            SELECT 
                om.*,
                CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
                CONCAT(m.nombreUsuario, ' ', m.apellidoUsuario) AS nombreMedico,
                e.nombreEspecialidad AS especialidad
            FROM CLINICA_PI3.ORDENES_MEDICAS om
            JOIN CLINICA_PI3.REGISTROS_CONSULTAS rc ON om.idRegistroConsulta = rc.idRegistroConsulta
            JOIN CLINICA_PI3.CITAS c ON rc.idCita = c.idCita
            JOIN CLINICA_PI3.USUARIOS p ON c.idPaciente = p.idUsuario
            JOIN CLINICA_PI3.USUARIOS m ON rc.idMedico = m.idUsuario
            JOIN CLINICA_PI3.MEDICOS med ON m.idUsuario = med.idMedico
            JOIN CLINICA_PI3.ESPECIALIDADES e ON med.idEspecialidad = e.idEspecialidad
            ORDER BY om.fechaEmision DESC
        `;
        
        const [rows] = await pool.query(query);
        return rows as OrdenMedicaCompleta[];
    }

    // Obtener órdenes por paciente
    public static async obtenerPorPaciente(idPaciente: number): Promise<OrdenMedicaCompleta[]> {
        const query = `
            SELECT 
                om.*,
                CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
                CONCAT(m.nombreUsuario, ' ', m.apellidoUsuario) AS nombreMedico,
                e.nombreEspecialidad AS especialidad
            FROM CLINICA_PI3.ORDENES_MEDICAS om
            JOIN CLINICA_PI3.REGISTROS_CONSULTAS rc ON om.idRegistroConsulta = rc.idRegistroConsulta
            JOIN CLINICA_PI3.CITAS c ON rc.idCita = c.idCita
            JOIN CLINICA_PI3.USUARIOS p ON c.idPaciente = p.idUsuario
            JOIN CLINICA_PI3.USUARIOS m ON rc.idMedico = m.idUsuario
            JOIN CLINICA_PI3.MEDICOS med ON m.idUsuario = med.idMedico
            JOIN CLINICA_PI3.ESPECIALIDADES e ON med.idEspecialidad = e.idEspecialidad
            WHERE c.idPaciente = ?
            ORDER BY om.fechaEmision DESC
        `;
        
        const [rows] = await pool.query(query, [idPaciente]);
        return rows as OrdenMedicaCompleta[];
    }

    // Obtener una orden por ID
    public static async obtenerPorId(id: number): Promise<OrdenMedicaCompleta | null> {
        const query = `
            SELECT 
                om.*,
                CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
                CONCAT(m.nombreUsuario, ' ', m.apellidoUsuario) AS nombreMedico,
                e.nombreEspecialidad AS especialidad
            FROM CLINICA_PI3.ORDENES_MEDICAS om
            JOIN CLINICA_PI3.REGISTROS_CONSULTAS rc ON om.idRegistroConsulta = rc.idRegistroConsulta
            JOIN CLINICA_PI3.CITAS c ON rc.idCita = c.idCita
            JOIN CLINICA_PI3.USUARIOS p ON c.idPaciente = p.idUsuario
            JOIN CLINICA_PI3.USUARIOS m ON rc.idMedico = m.idUsuario
            JOIN CLINICA_PI3.MEDICOS med ON m.idUsuario = med.idMedico
            JOIN CLINICA_PI3.ESPECIALIDADES e ON med.idEspecialidad = e.idEspecialidad
            WHERE om.idOrdenMedica = ?
        `;

        const [rows]: any = await pool.query(query, [id]);

        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        }
        return null;
    }

    // Actualizar una orden médica
    public static async actualizar(id: number, ordenMedica: Partial<OrdenMedica>): Promise<void> {
        const campos = [];
        const valores = [];

        if (ordenMedica.tipoOrden !== undefined) {
            campos.push('tipoOrden = ?');
            valores.push(ordenMedica.tipoOrden);
        }
        if (ordenMedica.descripcion !== undefined) {
            campos.push('descripcion = ?');
            valores.push(ordenMedica.descripcion);
        }
        if (ordenMedica.fechaVencimiento !== undefined) {
            campos.push('fechaVencimiento = ?');
            valores.push(ordenMedica.fechaVencimiento);
        }
        if (ordenMedica.estadoOrden !== undefined) {
            campos.push('estadoOrden = ?');
            valores.push(ordenMedica.estadoOrden);
        }
        if (ordenMedica.observaciones !== undefined) {
            campos.push('observaciones = ?');
            valores.push(ordenMedica.observaciones);
        }

        if (campos.length === 0) {
            throw new Error('No hay campos para actualizar');
        }

        valores.push(id);

        const query = `UPDATE CLINICA_PI3.ORDENES_MEDICAS SET ${campos.join(', ')} WHERE idOrdenMedica = ?`;
        await pool.query(query, valores);
    }

    // Eliminar una orden médica
    public static async eliminar(id: number): Promise<void> {
        await pool.query(
            'DELETE FROM CLINICA_PI3.ORDENES_MEDICAS WHERE idOrdenMedica = ?',
            [id]
        );
    }

    public static async obtenerPorCedulaPaciente(numeroDocumento: string): Promise<OrdenMedicaCompleta[]> {
    const query = `
        SELECT 
            om.*,
            CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
            CONCAT(m.nombreUsuario, ' ', m.apellidoUsuario) AS nombreMedico,
            e.nombreEspecialidad AS especialidad
        FROM CLINICA_PI3.ORDENES_MEDICAS om
        JOIN CLINICA_PI3.REGISTROS_CONSULTAS rc ON om.idRegistroConsulta = rc.idRegistroConsulta
        JOIN CLINICA_PI3.CITAS c ON rc.idCita = c.idCita
        JOIN CLINICA_PI3.USUARIOS p ON c.idPaciente = p.idUsuario
        JOIN CLINICA_PI3.USUARIOS m ON rc.idMedico = m.idUsuario
        JOIN CLINICA_PI3.MEDICOS med ON m.idUsuario = med.idMedico
        JOIN CLINICA_PI3.ESPECIALIDADES e ON med.idEspecialidad = e.idEspecialidad
        WHERE p.numeroDocumento = ?
        ORDER BY om.fechaEmision DESC
    `;
    
    const [rows] = await pool.query(query, [numeroDocumento]);
    return rows as OrdenMedicaCompleta[];
}

public static async obtenerConFiltros(filtros: FiltroOrdenes): Promise<OrdenMedicaCompleta[]> {
    let query = `
        SELECT 
            om.*,
            CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
            CONCAT(m.nombreUsuario, ' ', m.apellidoUsuario) AS nombreMedico,
            e.nombreEspecialidad AS especialidad
        FROM CLINICA_PI3.ORDENES_MEDICAS om
        JOIN CLINICA_PI3.REGISTROS_CONSULTAS rc ON om.idRegistroConsulta = rc.idRegistroConsulta
        JOIN CLINICA_PI3.CITAS c ON rc.idCita = c.idCita
        JOIN CLINICA_PI3.USUARIOS p ON c.idPaciente = p.idUsuario
        JOIN CLINICA_PI3.USUARIOS m ON rc.idMedico = m.idUsuario
        JOIN CLINICA_PI3.MEDICOS med ON m.idUsuario = med.idMedico
        JOIN CLINICA_PI3.ESPECIALIDADES e ON med.idEspecialidad = e.idEspecialidad
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
    
    if (filtros.estadoOrden) {
        query += ' AND om.estadoOrden = ?';
        params.push(filtros.estadoOrden);
    }
    
    if (filtros.tipoOrden) {
        query += ' AND om.tipoOrden = ?';
        params.push(filtros.tipoOrden);
    }
    
    if (filtros.fechaInicio) {
        query += ' AND DATE(om.fechaEmision) >= ?';
        params.push(filtros.fechaInicio);
    }
    
    if (filtros.fechaFin) {
        query += ' AND DATE(om.fechaEmision) <= ?';
        params.push(filtros.fechaFin);
    }
    
    query += ' ORDER BY om.fechaEmision DESC';
    
    const [rows] = await pool.query(query, params);
    return rows as OrdenMedicaCompleta[];
}
}