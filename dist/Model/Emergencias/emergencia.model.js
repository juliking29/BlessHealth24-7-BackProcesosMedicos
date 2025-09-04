"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Model/Emergencias/emergencia.model.ts
const database_1 = require("../../config/database");
class EmergenciaModel {
    static async obtenerTodos() {
        const [rows] = await database_1.pool.query('SELECT * FROM CLINICA_PI3.EMERGENCIAS');
        return rows;
    }
    static async obtenerPorId(id) {
        const [rows] = await database_1.pool.query('SELECT * FROM CLINICA_PI3.EMERGENCIAS WHERE idEmergencia = ?', [id]);
        const result = rows;
        return result[0] ?? null;
    }
    static async crear(em) {
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
        const [result] = await database_1.pool.query(query, valores);
        return result.insertId;
    }
    static async actualizar(id, em) {
        const campos = [];
        const valores = [];
        const pushField = (fieldName, value) => {
            campos.push(`${fieldName} = ?`);
            valores.push(value);
        };
        if (em.idSede !== undefined)
            pushField('idSede', em.idSede);
        if (em.idTipoEmergencia !== undefined)
            pushField('idTipoEmergencia', em.idTipoEmergencia);
        if (em.idPaciente !== undefined)
            pushField('idPaciente', em.idPaciente);
        if (em.idMedico !== undefined)
            pushField('idMedico', em.idMedico);
        if (em.fechaHoraLlegada !== undefined)
            pushField('fechaHoraLlegada', em.fechaHoraLlegada);
        if (em.fechaHoraAtencion !== undefined)
            pushField('fechaHoraAtencion', em.fechaHoraAtencion);
        if (em.fechaHoraAlta !== undefined)
            pushField('fechaHoraAlta', em.fechaHoraAlta);
        if (em.motivo !== undefined)
            pushField('motivo', em.motivo);
        if (em.sintomas !== undefined)
            pushField('sintomas', em.sintomas);
        if (em.diagnostico !== undefined)
            pushField('diagnostico', em.diagnostico);
        if (em.tratamiento !== undefined)
            pushField('tratamiento', em.tratamiento);
        if (em.observaciones !== undefined)
            pushField('observaciones', em.observaciones);
        if (em.estadoEmergencia !== undefined)
            pushField('estadoEmergencia', em.estadoEmergencia);
        if (campos.length === 0)
            throw new Error('No hay campos para actualizar');
        valores.push(id);
        const query = `UPDATE CLINICA_PI3.EMERGENCIAS SET ${campos.join(', ')} WHERE idEmergencia = ?`;
        await database_1.pool.query(query, valores);
    }
    static async eliminar(id) {
        await database_1.pool.query('DELETE FROM CLINICA_PI3.EMERGENCIAS WHERE idEmergencia = ?', [id]);
    }
    static async obtenerFiltrado(filters) {
        const where = [];
        const params = [];
        if (filters.estado) {
            where.push('estadoEmergencia = ?');
            params.push(filters.estado);
        }
        if (filters.idSede !== undefined) {
            where.push('idSede = ?');
            params.push(filters.idSede);
        }
        if (filters.idTipoEmergencia !== undefined) {
            where.push('idTipoEmergencia = ?');
            params.push(filters.idTipoEmergencia);
        }
        if (filters.fechaDesde) {
            where.push('fechaHoraLlegada >= ?');
            params.push(filters.fechaDesde);
        }
        if (filters.fechaHasta) {
            where.push('fechaHoraLlegada <= ?');
            params.push(filters.fechaHasta);
        }
        const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
        // contar total
        const [countRows] = await database_1.pool.query(`SELECT COUNT(*) as total FROM CLINICA_PI3.EMERGENCIAS ${whereSql}`, params);
        const total = countRows[0].total;
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
        const [rows] = await database_1.pool.query(query, params);
        return [rows, total];
    }
    static async obtenerAbiertas() {
        const [rows] = await database_1.pool.query(`SELECT * FROM CLINICA_PI3.EMERGENCIAS WHERE estadoEmergencia NOT IN ('Alta','Fallecido') ORDER BY fechaHoraLlegada DESC`);
        return rows;
    }
    static async obtenerPorSede(idSede) {
        const [rows] = await database_1.pool.query('SELECT * FROM CLINICA_PI3.EMERGENCIAS WHERE idSede = ?', [idSede]);
        return rows;
    }
    static async obtenerPorTipo(idTipo) {
        const [rows] = await database_1.pool.query('SELECT * FROM CLINICA_PI3.EMERGENCIAS WHERE idTipoEmergencia = ?', [idTipo]);
        return rows;
    }
    static async contarPorEstado() {
        const [rows] = await database_1.pool.query('SELECT estadoEmergencia as estado, COUNT(*) as total FROM CLINICA_PI3.EMERGENCIAS GROUP BY estadoEmergencia');
        return rows.map(r => ({ estado: r.estado, total: r.total }));
    }
    static async asignarMedico(id, idMedico) {
        await database_1.pool.query('UPDATE CLINICA_PI3.EMERGENCIAS SET idMedico = ? WHERE idEmergencia = ?', [idMedico, id]);
    }
    static async asignarPaciente(id, idPaciente) {
        await database_1.pool.query('UPDATE CLINICA_PI3.EMERGENCIAS SET idPaciente = ? WHERE idEmergencia = ?', [idPaciente, id]);
    }
    static async marcarAtencion(id, fechaHoraAtencion) {
        await database_1.pool.query('UPDATE CLINICA_PI3.EMERGENCIAS SET fechaHoraAtencion = ?, estadoEmergencia = ? WHERE idEmergencia = ?', [fechaHoraAtencion, 'En atención', id]);
    }
}
exports.default = EmergenciaModel;
