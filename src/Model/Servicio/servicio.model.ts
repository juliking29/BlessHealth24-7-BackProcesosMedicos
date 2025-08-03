import { pool } from '../../config/database';
import { 
    ServicioPorEspecialidad,
    
    ServicioTexto
} from '../../interfaces/Servicio/servicio.interface';

export default class ServicioModel {
    // Obtener servicios por especialidad (formateado como texto)
    public static async obtenerServiciosPorEspecialidadTexto(idEspecialidad: number): Promise<ServicioTexto> {
        try {
            const query = 'SELECT fn_servicios_por_especialidad(?) AS resultado';
            const [rows]: any = await pool.query(query, [idEspecialidad]);
            
            return {
                texto: rows[0].resultado || 'No se encontraron resultados'
            };
        } catch (error) {
            throw new Error(`Error al obtener servicios por especialidad: ${error instanceof Error ? error.message : error}`);
        }
    }

    // Obtener todos los servicios (formateado como texto)
    public static async obtenerTodosServiciosTexto(): Promise<ServicioTexto> {
        try {
            const query = 'SELECT fn_todos_servicios_con_precios() AS resultado';
            const [rows]: any = await pool.query(query);
            
            return {
                texto: rows[0].resultado || 'No se encontraron resultados'
            };
        } catch (error) {
            throw new Error(`Error al obtener todos los servicios: ${error instanceof Error ? error.message : error}`);
        }
    }

    // Obtener servicios por especialidad (estructurado)
    public static async obtenerServiciosPorEspecialidad(idEspecialidad: number): Promise<ServicioPorEspecialidad[]> {
        try {
            const query = 'CALL VerPreciosEspecialidad(?)';
            const [rows]: any = await pool.query(query, [idEspecialidad]);
            
            return rows[0] as ServicioPorEspecialidad[];
        } catch (error) {
            throw new Error(`Error al obtener servicios por especialidad: ${error instanceof Error ? error.message : error}`);
        }
    }
}