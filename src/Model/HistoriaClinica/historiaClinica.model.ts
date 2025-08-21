import { pool } from '../../config/database';
import HistoriaClinica from '../../interfaces/HistoriaClinica/historiaClinica.interface';

export default class HistoriaClinicaModel {

    // Obtener historias clínicas por número de documento del paciente
    public static async obtenerPorDocumentoPaciente(numeroDocumento: string): Promise<HistoriaClinica[]> {
        const query = `
            SELECT 
                hc.*,
                u.nombreUsuario,
                u.apellidoUsuario,
                u.numeroDocumento
            FROM CLINICA_PI3.HISTORIAS_CLINICAS hc
            JOIN CLINICA_PI3.USUARIOS u ON hc.idPaciente = u.idUsuario
            WHERE u.numeroDocumento = ?
            ORDER BY hc.fechaCreacion DESC
        `;
        
        const [rows] = await pool.query(query, [numeroDocumento]);
        return rows as HistoriaClinica[];
    }

    // Obtener todas las historias clínicas
    public static async obtenerTodos(): Promise<HistoriaClinica[]> {
        const query = `
            SELECT 
                hc.*,
                u.nombreUsuario,
                u.apellidoUsuario,
                u.numeroDocumento
            FROM CLINICA_PI3.HISTORIAS_CLINICAS hc
            JOIN CLINICA_PI3.USUARIOS u ON hc.idPaciente = u.idUsuario
            ORDER BY hc.idHistoriaClinica
        `;
        
        const [rows] = await pool.query(query);
        return rows as HistoriaClinica[];
    }

    // Obtener historias clínicas por paciente
    public static async obtenerPorPaciente(idPaciente: number): Promise<HistoriaClinica[]> {
        const query = `
            SELECT 
                hc.*,
                u.nombreUsuario,
                u.apellidoUsuario,
                u.numeroDocumento
            FROM CLINICA_PI3.HISTORIAS_CLINICAS hc
            JOIN CLINICA_PI3.USUARIOS u ON hc.idPaciente = u.idUsuario
            WHERE hc.idPaciente = ?
            ORDER BY hc.fechaCreacion DESC
        `;
        
        const [rows] = await pool.query(query, [idPaciente]);
        return rows as HistoriaClinica[];
    }

    // Obtener una historia clínica por su ID
    public static async obtenerPorId(id: number): Promise<HistoriaClinica | null> {
        const query = `
            SELECT 
                hc.*,
                u.nombreUsuario,
                u.apellidoUsuario,
                u.numeroDocumento
            FROM CLINICA_PI3.HISTORIAS_CLINICAS hc
            JOIN CLINICA_PI3.USUARIOS u ON hc.idPaciente = u.idUsuario
            WHERE hc.idHistoriaClinica = ?
        `;

        const [rows]: any = await pool.query(query, [id]);

        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        }
        return null;
    }

    // Crear una nueva historia clínica
    public static async crear(historiaClinica: HistoriaClinica): Promise<number> {
        const query = `
            INSERT INTO CLINICA_PI3.HISTORIAS_CLINICAS 
            (idPaciente, tipoSangre, alergias, enfermedadesCronicas, 
             medicamentos, antecedentesFamiliares, observaciones,
             actividadFisica, alimentacionDiaria, suenio, sexualidad,
             viajes, alcohol, sustanciasPsicoactivas, antecedentesPersonales,
             diagnosticosPrincipales, diagnosticosDiferenciales, planManejo,
             conductaTratamiento, remisiones, examenesSolicitados,
             educacionPaciente, epicrisis)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result]: any = await pool.query(query, [
            historiaClinica.idPaciente,
            historiaClinica.tipoSangre || null,
            historiaClinica.alergias || null,
            historiaClinica.enfermedadesCronicas || null,
            historiaClinica.medicamentos || null,
            historiaClinica.antecedentesFamiliares || null,
            historiaClinica.observaciones || null,
            // Nuevos campos
            historiaClinica.actividadFisica || null,
            historiaClinica.alimentacionDiaria || null,
            historiaClinica.suenio || null,
            historiaClinica.sexualidad || null,
            historiaClinica.viajes || null,
            historiaClinica.alcohol || null,
            historiaClinica.sustanciasPsicoactivas || null,
            historiaClinica.antecedentesPersonales || null,
            historiaClinica.diagnosticosPrincipales || null,
            historiaClinica.diagnosticosDiferenciales || null,
            historiaClinica.planManejo || null,
            historiaClinica.conductaTratamiento || null,
            historiaClinica.remisiones || null,
            historiaClinica.examenesSolicitados || null,
            historiaClinica.educacionPaciente || null,
            historiaClinica.epicrisis || null
        ]);

        return result.insertId;
    }

    // Actualizar una historia clínica
    public static async actualizar(id: number, historiaClinica: Partial<HistoriaClinica>): Promise<HistoriaClinica> {
        // Construir la query dinámicamente
        const campos = [];
        const valores = [];

        // Campos originales
        if (historiaClinica.tipoSangre !== undefined) {
            campos.push('tipoSangre = ?');
            valores.push(historiaClinica.tipoSangre);
        }
        if (historiaClinica.alergias !== undefined) {
            campos.push('alergias = ?');
            valores.push(historiaClinica.alergias);
        }
        if (historiaClinica.enfermedadesCronicas !== undefined) {
            campos.push('enfermedadesCronicas = ?');
            valores.push(historiaClinica.enfermedadesCronicas);
        }
        if (historiaClinica.medicamentos !== undefined) {
            campos.push('medicamentos = ?');
            valores.push(historiaClinica.medicamentos);
        }
        if (historiaClinica.antecedentesFamiliares !== undefined) {
            campos.push('antecedentesFamiliares = ?');
            valores.push(historiaClinica.antecedentesFamiliares);
        }
        if (historiaClinica.observaciones !== undefined) {
            campos.push('observaciones = ?');
            valores.push(historiaClinica.observaciones);
        }

        // Nuevos campos
        if (historiaClinica.actividadFisica !== undefined) {
            campos.push('actividadFisica = ?');
            valores.push(historiaClinica.actividadFisica);
        }
        if (historiaClinica.alimentacionDiaria !== undefined) {
            campos.push('alimentacionDiaria = ?');
            valores.push(historiaClinica.alimentacionDiaria);
        }
        if (historiaClinica.suenio !== undefined) {
            campos.push('suenio = ?');
            valores.push(historiaClinica.suenio);
        }
        if (historiaClinica.sexualidad !== undefined) {
            campos.push('sexualidad = ?');
            valores.push(historiaClinica.sexualidad);
        }
        if (historiaClinica.viajes !== undefined) {
            campos.push('viajes = ?');
            valores.push(historiaClinica.viajes);
        }
        if (historiaClinica.alcohol !== undefined) {
            campos.push('alcohol = ?');
            valores.push(historiaClinica.alcohol);
        }
        if (historiaClinica.sustanciasPsicoactivas !== undefined) {
            campos.push('sustanciasPsicoactivas = ?');
            valores.push(historiaClinica.sustanciasPsicoactivas);
        }
        if (historiaClinica.antecedentesPersonales !== undefined) {
            campos.push('antecedentesPersonales = ?');
            valores.push(historiaClinica.antecedentesPersonales);
        }
        if (historiaClinica.diagnosticosPrincipales !== undefined) {
            campos.push('diagnosticosPrincipales = ?');
            valores.push(historiaClinica.diagnosticosPrincipales);
        }
        if (historiaClinica.diagnosticosDiferenciales !== undefined) {
            campos.push('diagnosticosDiferenciales = ?');
            valores.push(historiaClinica.diagnosticosDiferenciales);
        }
        if (historiaClinica.planManejo !== undefined) {
            campos.push('planManejo = ?');
            valores.push(historiaClinica.planManejo);
        }
        if (historiaClinica.conductaTratamiento !== undefined) {
            campos.push('conductaTratamiento = ?');
            valores.push(historiaClinica.conductaTratamiento);
        }
        if (historiaClinica.remisiones !== undefined) {
            campos.push('remisiones = ?');
            valores.push(historiaClinica.remisiones);
        }
        if (historiaClinica.examenesSolicitados !== undefined) {
            campos.push('examenesSolicitados = ?');
            valores.push(historiaClinica.examenesSolicitados);
        }
        if (historiaClinica.educacionPaciente !== undefined) {
            campos.push('educacionPaciente = ?');
            valores.push(historiaClinica.educacionPaciente);
        }
        if (historiaClinica.epicrisis !== undefined) {
            campos.push('epicrisis = ?');
            valores.push(historiaClinica.epicrisis);
        }

        // Siempre actualizamos la fecha de última actualización
        campos.push('fechaUltimaActualizacion = CURRENT_TIMESTAMP');
        
        if (campos.length === 0) {
            throw new Error('No hay campos para actualizar');
        }

        valores.push(id);

        const query = `UPDATE CLINICA_PI3.HISTORIAS_CLINICAS SET ${campos.join(', ')} WHERE idHistoriaClinica = ?`;
        
        await pool.query(query, valores);
        
        // Obtener y devolver la historia clínica actualizada
        const historiaActualizada = await this.obtenerPorId(id);
        if (!historiaActualizada) {
            throw new Error('Historia clínica no encontrada después de actualización');
        }
        
        return historiaActualizada;
    }

    // Eliminar una historia clínica
    public static async eliminar(id: number): Promise<void> {
        await pool.query(
            'DELETE FROM CLINICA_PI3.HISTORIAS_CLINICAS WHERE idHistoriaClinica = ?',
            [id]
        );
    }
}