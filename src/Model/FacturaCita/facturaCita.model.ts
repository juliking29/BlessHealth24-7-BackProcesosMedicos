import { pool } from '../../config/database';
import { 
    GenerarFacturaCitaParams, 
    GenerarFacturaCitaResult,
    FacturaDetallada,
    ActualizarCitaParams,
    DetallesCita,
    ActualizarFacturaParams,
    ActualizarFacturaResult,
    EliminarFacturaResult
} from '../../interfaces/FacturaCita/facturaCita.interface';

export default class FacturaCitaModel {
    // Generar factura desde una cita
    public static async generarFacturaCita(params: GenerarFacturaCitaParams): Promise<GenerarFacturaCitaResult> {
        try {
            const query = 'SELECT GenerarFacturaCita(?) AS resultado';
            const [rows]: any = await pool.query(query, [params.idCita]);
            
            const resultado = rows[0].resultado;
            
            if (resultado.startsWith('ERROR:')) {
                return {
                    success: false,
                    message: resultado
                };
            }
            
            // Extraer el número de factura del mensaje de éxito
            const numeroFactura = resultado.match(/FAC-\d{4}-\d{6}/)?.[0];
            
            return {
                success: true,
                message: resultado,
                numeroFactura: numeroFactura
            };
        } catch (error) {
            throw new Error(`Error al generar factura: ${error instanceof Error ? error.message : error}`);
        }
    }

    // Obtener facturas por cédula de paciente
    public static async obtenerFacturasPorCedula(cedula: string): Promise<FacturaDetallada[]> {
        try {
            const query = 'CALL VerFacturasPorCedula(?)';
            const [rows]: any = await pool.query(query, [cedula]);
            
            // El procedimiento almacenado devuelve los resultados en el primer elemento del array
            return rows[0] as FacturaDetallada[];
        } catch (error) {
            throw new Error(`Error al obtener facturas por cédula: ${error instanceof Error ? error.message : error}`);
        }
    }

    // Actualizar cita
    public static async actualizarCita(params: ActualizarCitaParams): Promise<string> {
        try {
            const query = 'CALL ActualizarCita(?, ?, ?, ?, ?)';
            const [rows]: any = await pool.query(query, [
                params.idCita,
                params.idMedico || null,
                params.fechaHora || null,
                params.estadoCita || null,
                params.observaciones || null
            ]);
            
            // El procedimiento devuelve un mensaje en el primer elemento del array
            return rows[0][0].mensaje;
        } catch (error) {
            throw new Error(`Error al actualizar cita: ${error instanceof Error ? error.message : error}`);
        }
    }

    // Obtener detalles de una cita
    public static async obtenerDetallesCita(idCita: number): Promise<DetallesCita> {
        try {
            const query = 'CALL ObtenerDetallesCita(?)';
            const [rows]: any = await pool.query(query, [idCita]);
            
            // El procedimiento devuelve los detalles en el primer elemento del array
            if (rows[0].length === 0) {
                throw new Error('Cita no encontrada');
            }
            
            return rows[0][0] as DetallesCita;
        } catch (error) {
            throw new Error(`Error al obtener detalles de cita: ${error instanceof Error ? error.message : error}`);
        }
    }

    // Añadir estos nuevos métodos a la clase FacturaModel

// Eliminar factura
public static async eliminarFactura(idFactura: number): Promise<EliminarFacturaResult> {
    try {
        const query = 'SELECT fn_eliminar_factura(?) AS resultado';
        const [rows]: any = await pool.query(query, [idFactura]);
        
        const resultado = JSON.parse(rows[0].resultado);
        return resultado;
    } catch (error) {
        throw new Error(`Error al eliminar factura: ${error instanceof Error ? error.message : error}`);
    }
}

// Actualizar factura
public static async actualizarFactura(params: ActualizarFacturaParams): Promise<ActualizarFacturaResult> {
    try {
        const query = 'CALL sp_actualizar_factura(?, ?, ?, ?, ?, ?, ?, ?, @resultado); SELECT @resultado AS resultado';
        const [rows]: any = await pool.query(query, [
            params.idFactura,
            params.idCita || 0, // Convertimos null/undefined a 0 para que se transforme a NULL en la BD
            params.idEmergencia || 0,
            params.concepto || null,
            params.detalles || null,
            params.fechaVencimiento || null,
            params.subtotal || null,
            params.observaciones || null
        ]);
        
        // El procedimiento devuelve el resultado en el segundo conjunto de resultados
        const resultado = JSON.parse(rows[1][0].resultado);
        return resultado;
    } catch (error) {
        throw new Error(`Error al actualizar factura: ${error instanceof Error ? error.message : error}`);
    }
}
}