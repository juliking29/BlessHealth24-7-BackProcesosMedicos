// Model/Emergencias/emergencia.model.ts
import { pool } from '../../config/database';
import Emergencia from '../../interfaces/Emergencias/emergencia.interface';

export default class EmergenciaModel {
  public static async obtenerTodos(): Promise<Emergencia[]> {
    const [rows] = await pool.query('SELECT * FROM CLINICA_PI3.EMERGENCIAS');
    return rows as Emergencia[];
  }

  public static async obtenerPorId(id: number): Promise<Emergencia | null> {
    const [rows] = await pool.query('SELECT * FROM CLINICA_PI3.EMERGENCIAS WHERE idEmergencia = ?', [id]);
    const result = rows as Emergencia[];
    return result[0] ?? null;
  }

  public static async crear(em: Emergencia): Promise<number> {
    const query = `
      INSERT INTO CLINICA_PI3.EMERGENCIAS
        (idSede, idTipoEmergencia, idPaciente, idMedico, fechaHoraLlegada, fechaHoraAtencion, fechaHoraAlta,
         motivo, sintomas, diagnostico, tratamiento, observaciones, estadoEmergencia)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const valores = [
      em.idSede,
      em.idTipoEmergencia,
      em.idPaciente ?? null,
      em.idMedico ?? null,
      em.fechaHoraLlegada,
      em.fechaHoraAtencion ?? null,
      em.fechaHoraAlta ?? null,
      em.motivo,
      em.sintomas ?? null,
      em.diagnostico ?? null,
      em.tratamiento ?? null,
      em.observaciones ?? null,
      em.estadoEmergencia ?? 'Ingresada'
    ];
    const [result]: any = await pool.query(query, valores);
    return result.insertId as number;
  }

  public static async actualizar(id: number, em: Partial<Emergencia>): Promise<void> {
    const campos: string[] = [];
    const valores: any[] = [];

    const pushField = (fieldName: string, value: any) => {
      campos.push(`${fieldName} = ?`);
      valores.push(value);
    };

    if (em.idSede !== undefined) pushField('idSede', em.idSede);
    if (em.idTipoEmergencia !== undefined) pushField('idTipoEmergencia', em.idTipoEmergencia);
    if (em.idPaciente !== undefined) pushField('idPaciente', em.idPaciente);
    if (em.idMedico !== undefined) pushField('idMedico', em.idMedico);
    if (em.fechaHoraLlegada !== undefined) pushField('fechaHoraLlegada', em.fechaHoraLlegada);
    if (em.fechaHoraAtencion !== undefined) pushField('fechaHoraAtencion', em.fechaHoraAtencion);
    if (em.fechaHoraAlta !== undefined) pushField('fechaHoraAlta', em.fechaHoraAlta);
    if (em.motivo !== undefined) pushField('motivo', em.motivo);
    if (em.sintomas !== undefined) pushField('sintomas', em.sintomas);
    if (em.diagnostico !== undefined) pushField('diagnostico', em.diagnostico);
    if (em.tratamiento !== undefined) pushField('tratamiento', em.tratamiento);
    if (em.observaciones !== undefined) pushField('observaciones', em.observaciones);
    if (em.estadoEmergencia !== undefined) pushField('estadoEmergencia', em.estadoEmergencia);

    if (campos.length === 0) throw new Error('No hay campos para actualizar');

    valores.push(id);
    const query = `UPDATE CLINICA_PI3.EMERGENCIAS SET ${campos.join(', ')} WHERE idEmergencia = ?`;
    await pool.query(query, valores);
  }

  public static async eliminar(id: number): Promise<void> {
    await pool.query('DELETE FROM CLINICA_PI3.EMERGENCIAS WHERE idEmergencia = ?', [id]);
  }

  public static async obtenerFiltrado(filters: {
    estado?: string,
    idSede?: number,
    idTipoEmergencia?: number,
    fechaDesde?: string,
    fechaHasta?: string,
    limit?: number,
    offset?: number
  }): Promise<[Emergencia[], number]> {
    const where: string[] = [];
    const params: any[] = [];

    if (filters.estado) { where.push('estadoEmergencia = ?'); params.push(filters.estado); }
    if (filters.idSede !== undefined) { where.push('idSede = ?'); params.push(filters.idSede); }
    if (filters.idTipoEmergencia !== undefined) { where.push('idTipoEmergencia = ?'); params.push(filters.idTipoEmergencia); }
    if (filters.fechaDesde) { where.push('fechaHoraLlegada >= ?'); params.push(filters.fechaDesde); }
    if (filters.fechaHasta) { where.push('fechaHoraLlegada <= ?'); params.push(filters.fechaHasta); }

    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
    // contar total
    const [countRows]: any = await pool.query(`SELECT COUNT(*) as total FROM CLINICA_PI3.EMERGENCIAS ${whereSql}`, params);
    const total = countRows[0].total as number;

    // paginación
    let limitOffsetSql = 'ORDER BY fechaHoraLlegada DESC';
    if (typeof filters.limit === 'number') {
      limitOffsetSql += ' LIMIT ?';
      params.push(filters.limit);
      if (typeof filters.offset === 'number') {
        limitOffsetSql += ' OFFSET ?';
        params.push(filters.offset);
      }
    }

    const query = `SELECT * FROM CLINICA_PI3.EMERGENCIAS ${whereSql} ${limitOffsetSql}`;
    const [rows] = await pool.query(query, params);
    return [rows as Emergencia[], total];
  }

  public static async obtenerAbiertas(): Promise<Emergencia[]> {
    const [rows] = await pool.query(
      `SELECT * FROM CLINICA_PI3.EMERGENCIAS WHERE estadoEmergencia NOT IN ('Alta','Fallecido') ORDER BY fechaHoraLlegada DESC`
    );
    return rows as Emergencia[];
  }

  public static async obtenerPorSede(idSede: number): Promise<Emergencia[]> {
    const [rows] = await pool.query('SELECT * FROM CLINICA_PI3.EMERGENCIAS WHERE idSede = ?', [idSede]);
    return rows as Emergencia[];
  }

  public static async obtenerPorTipo(idTipo: number): Promise<Emergencia[]> {
    const [rows] = await pool.query('SELECT * FROM CLINICA_PI3.EMERGENCIAS WHERE idTipoEmergencia = ?', [idTipo]);
    return rows as Emergencia[];
  }

  public static async contarPorEstado(): Promise<{ estado: string; total: number }[]> {
    const [rows] = await pool.query('SELECT estadoEmergencia as estado, COUNT(*) as total FROM CLINICA_PI3.EMERGENCIAS GROUP BY estadoEmergencia');
    return (rows as any[]).map(r => ({ estado: r.estado, total: r.total }));
  }

  public static async asignarMedico(id: number, idMedico: number): Promise<void> {
    await pool.query('UPDATE CLINICA_PI3.EMERGENCIAS SET idMedico = ? WHERE idEmergencia = ?', [idMedico, id]);
  }

  public static async asignarPaciente(id: number, idPaciente: number): Promise<void> {
    await pool.query('UPDATE CLINICA_PI3.EMERGENCIAS SET idPaciente = ? WHERE idEmergencia = ?', [idPaciente, id]);
  }

  public static async marcarAtencion(id: number, fechaHoraAtencion: string): Promise<void> {
    await pool.query('UPDATE CLINICA_PI3.EMERGENCIAS SET fechaHoraAtencion = ?, estadoEmergencia = ? WHERE idEmergencia = ?', [fechaHoraAtencion, 'En atención', id]);
  }
}
