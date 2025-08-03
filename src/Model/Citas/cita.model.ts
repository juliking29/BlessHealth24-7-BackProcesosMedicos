// Model/Cita/cita.model.ts

import { pool } from '../../config/database';
import { CitaCompleta, Cita, DisponibilidadMedico, Especialidad, Sede, Servicio, DisponibilidadHoraRequest, DisponibilidadRangoRequest, HorariosDisponiblesRequest } from '../../interfaces/Citas/cita.interface';


export default class CitaModel {
      // Método para disponibilidad por hora específica
    public static async obtenerMedicosDisponiblesPorEspecialidad(
        filtros: DisponibilidadHoraRequest
    ): Promise<any> {
        const query = `
            CALL CLINICA_PI3.ObtenerMedicosDisponiblesPorEspecialidad(?, ?, ?)
        `;
        const [rows]: any = await pool.query(query, [
            filtros.idEspecialidad,
            filtros.fecha,
            filtros.hora
        ]);
        return rows[0];
    }

    // Método para disponibilidad por rango de fechas
    public static async obtenerMedicosDisponiblesPorSedeEspecialidad(
        filtros: DisponibilidadRangoRequest
    ): Promise<any> {
        const query = `
            CALL CLINICA_PI3.ObtenerMedicosDisponiblesPorSedeEspecialidad(?, ?, ?, ?)
        `;
        const [rows]: any = await pool.query(query, [
            filtros.idSede,
            filtros.idEspecialidad,
            filtros.fechaInicio,
            filtros.fechaFin
        ]);
        return rows[0];
    }

    // Método para horarios disponibles en un día
    public static async obtenerMedicosConHorariosDisponibles(
        filtros: HorariosDisponiblesRequest
    ): Promise<any> {
        const query = `
            CALL CLINICA_PI3.ObtenerMedicosConHorariosDisponibles(?, ?, ?)
        `;
        const [rows]: any = await pool.query(query, [
            filtros.idSede,
            filtros.idEspecialidad,
            filtros.fecha
        ]);
        return rows[0];
    }

    // Obtener todas las citas con información relacionada
    public static async obtenerTodos(): Promise<CitaCompleta[]> {
        const query = `
            SELECT 
                c.*,
                CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
                CONCAT(m.nombreUsuario, ' ', m.apellidoUsuario) AS nombreMedico,
                s.nombreServicio,
                e.nombreEspecialidad,
                se.nombreSede
            FROM CLINICA_PI3.CITAS c
            LEFT JOIN CLINICA_PI3.USUARIOS p ON c.idPaciente = p.idUsuario
            LEFT JOIN CLINICA_PI3.USUARIOS m ON c.idMedico = m.idUsuario
            LEFT JOIN CLINICA_PI3.SERVICIOS s ON c.idServicio = s.idServicio
            LEFT JOIN CLINICA_PI3.ESPECIALIDADES e ON s.idEspecialidad = e.idEspecialidad
            LEFT JOIN CLINICA_PI3.SEDES se ON c.idSede = se.idSede
            ORDER BY c.fechaHora DESC
        `;
        
        const [rows] = await pool.query(query);
        return rows as CitaCompleta[];
    }

   

    // Obtener una cita por su ID
    public static async obtenerPorId(id: number): Promise<CitaCompleta | null> {
        const query = `
            SELECT 
                c.*,
                CONCAT(p.nombreUsuario, ' ', p.apellidoUsuario) AS nombrePaciente,
                CONCAT(m.nombreUsuario, ' ', m.apellidoUsuario) AS nombreMedico,
                s.nombreServicio,
                e.nombreEspecialidad,
                se.nombreSede
            FROM CLINICA_PI3.CITAS c
            LEFT JOIN CLINICA_PI3.USUARIOS p ON c.idPaciente = p.idUsuario
            LEFT JOIN CLINICA_PI3.USUARIOS m ON c.idMedico = m.idUsuario
            LEFT JOIN CLINICA_PI3.SERVICIOS s ON c.idServicio = s.idServicio
            LEFT JOIN CLINICA_PI3.ESPECIALIDADES e ON s.idEspecialidad = e.idEspecialidad
            LEFT JOIN CLINICA_PI3.SEDES se ON c.idSede = se.idSede
            WHERE c.idCita = ?
        `;

        const [rows]: any = await pool.query(query, [id]);

        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        }
        return null;
    }

    // Crear una nueva cita
    public static async crear(cita: Cita): Promise<number> {
        const query = `
            CALL CLINICA_PI3.AgendarCita(?, ?, ?, ?, ?, ?, ?)
        `;

        const [result]: any = await pool.query(query, [
            cita.idPaciente,
            cita.idServicio,
            cita.idSede,
            cita.fechaHora,
            cita.motivo,
            cita.sintomas || '',
            cita.idMedico
        ]);

        // El procedimiento devuelve el ID de la cita creada
        return result[0][0].idCita;
    }

    // Actualizar una cita
    public static async actualizar(id: number, cita: Partial<Cita>): Promise<CitaCompleta> {
        const query = `
            CALL CLINICA_PI3.ActualizarCita(?, ?, ?, ?, ?)
        `;

        await pool.query(query, [
            id,
            cita.fechaHora,
            cita.idMedico || null,
            cita.motivo || '',
            cita.sintomas || ''
        ]);

        // Obtener y devolver la cita actualizada
        const citaActualizada = await this.obtenerPorId(id);
        if (!citaActualizada) {
            throw new Error('Cita no encontrada después de actualización');
        }
        
        return citaActualizada;
    }

    // Cancelar una cita
    public static async cancelar(id: number, motivoCancelacion: string): Promise<void> {
        const query = `
            CALL CLINICA_PI3.CancelarCita(?, ?)
        `;

        await pool.query(query, [id, motivoCancelacion]);
    }

    // Eliminar una cita
    public static async eliminar(id: number): Promise<void> {
        const query = `
            CALL CLINICA_PI3.EliminarCita(?)
        `;

        await pool.query(query, [id]);
    }

    // Finalizar una cita
    public static async finalizar(id: number): Promise<any> {
        const query = `
            CALL CLINICA_PI3.FinalizarCitaConRegistro(?)
        `;

        const [result]: any = await pool.query(query, [id]);
        return result[0][0];
    }

   

    // Obtener todos los médicos con sus especialidades
    public static async obtenerTodosMedicosConEspecialidades(): Promise<DisponibilidadMedico[]> {
        const query = `
            CALL CLINICA_PI3.ObtenerTodosMedicosConEspecialidades()
        `;

        const [rows]: any = await pool.query(query);
        return rows[0] as DisponibilidadMedico[];
    }

   public static async obtenerCitasPorPaciente(
        idPaciente: number,
        estado?: string
    ): Promise<CitaCompleta[]> {
        const query = `
            CALL CLINICA_PI3.ObtenerCitasPorPaciente(?, ?)
        `;

        const [rows]: any = await pool.query(query, [idPaciente, estado || null]);
        return rows[0] as CitaCompleta[];
    }

    // Obtener citas por doctor
    public static async obtenerCitasPorDoctor(
        idMedico: number,
        estado?: string,
        fechaInicio?: Date | string,
        fechaFin?: Date | string
    ): Promise<CitaCompleta[]> {
        const query = `
            CALL CLINICA_PI3.ObtenerCitasPorDoctor(?, ?, ?, ?)
        `;

        const [rows]: any = await pool.query(query, [
            idMedico,
            estado || null,
            fechaInicio || null,
            fechaFin || null
        ]);
        return rows[0] as CitaCompleta[];
    }

    // Obtener todas las sedes
    public static async obtenerSedes(): Promise<Sede[]> {
        const query = `
            SELECT * FROM CLINICA_PI3.SEDES
        `;

        const [rows] = await pool.query(query);
        return rows as Sede[];
    }

    // Obtener todas las especialidades
    public static async obtenerEspecialidades(): Promise<Especialidad[]> {
        const query = `
            SELECT * FROM CLINICA_PI3.ESPECIALIDADES
        `;

        const [rows] = await pool.query(query);
        return rows as Especialidad[];
    }

    // Obtener todos los servicios
    public static async obtenerServicios(): Promise<Servicio[]> {
        const query = `
            SELECT * FROM CLINICA_PI3.SERVICIOS
        `;

        const [rows] = await pool.query(query);
        return rows as Servicio[];
    }
// Buscar citas por paciente (con cédula)
public static async buscarCitasPorPaciente(
    cedulaPaciente: string,
    fechaInicio?: Date | string | null,
    fechaFin?: Date | string | null
): Promise<CitaCompleta[]> {
    const query = `
        CALL CLINICA_PI3.BuscarCitasPaciente(?, ?, ?)
    `;

    const [rows]: any = await pool.query(query, [
        cedulaPaciente,
        fechaInicio || null,
        fechaFin || null
    ]);
    return rows[0] as CitaCompleta[];
}

// Buscar citas por médico (con cédula)
public static async buscarCitasPorMedico(
    cedulaMedico: string,
    fechaInicio?: Date | string | null,
    fechaFin?: Date | string | null
): Promise<CitaCompleta[]> {
    const query = `
        CALL CLINICA_PI3.BuscarCitasMedico(?, ?, ?)
    `;

    const [rows]: any = await pool.query(query, [
        cedulaMedico,
        fechaInicio || null,
        fechaFin || null
    ]);
    return rows[0] as CitaCompleta[];
}



}