"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../config/database");
class FacturaCitaModel {
    // Generar factura desde una cita
    static async generarFacturaCita(params) {
        try {
            const query = 'SELECT GenerarFacturaCita(?) AS resultado';
            const [rows] = await database_1.pool.query(query, [params.idCita]);
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
        }
        catch (error) {
            throw new Error(`Error al generar factura: ${error instanceof Error ? error.message : error}`);
        }
    }
    // Obtener facturas por cédula de paciente
    static async obtenerFacturasPorCedula(cedula) {
        try {
            const query = 'CALL VerFacturasPorCedula(?)';
            const [rows] = await database_1.pool.query(query, [cedula]);
            // El procedimiento almacenado devuelve los resultados en el primer elemento del array
            return rows[0];
        }
        catch (error) {
            throw new Error(`Error al obtener facturas por cédula: ${error instanceof Error ? error.message : error}`);
        }
    }
    // Actualizar cita
    static async actualizarCita(params) {
        try {
            const query = 'CALL ActualizarCita(?, ?, ?, ?, ?)';
            const [rows] = await database_1.pool.query(query, [
                params.idCita,
                params.idMedico || null,
                params.fechaHora || null,
                params.estadoCita || null,
                params.observaciones || null
            ]);
            // El procedimiento devuelve un mensaje en el primer elemento del array
            return rows[0][0].mensaje;
        }
        catch (error) {
            throw new Error(`Error al actualizar cita: ${error instanceof Error ? error.message : error}`);
        }
    }
    // Obtener detalles de una cita
    static async obtenerDetallesCita(idCita) {
        try {
            const query = 'CALL ObtenerDetallesCita(?)';
            const [rows] = await database_1.pool.query(query, [idCita]);
            // El procedimiento devuelve los detalles en el primer elemento del array
            if (rows[0].length === 0) {
                throw new Error('Cita no encontrada');
            }
            return rows[0][0];
        }
        catch (error) {
            throw new Error(`Error al obtener detalles de cita: ${error instanceof Error ? error.message : error}`);
        }
    }
    // Eliminar factura
    static async eliminarFactura(idFactura) {
        try {
            const query = 'SELECT fn_eliminar_factura(?) AS resultado';
            const [rows] = await database_1.pool.query(query, [idFactura]);
            const resultado = JSON.parse(rows[0].resultado);
            return resultado;
        }
        catch (error) {
            throw new Error(`Error al eliminar factura: ${error instanceof Error ? error.message : error}`);
        }
    }
    // Actualizar factura
    static async actualizarFactura(params) {
        try {
            const query = 'CALL sp_actualizar_factura(?, ?, ?, ?, ?, ?, ?, ?, @resultado); SELECT @resultado AS resultado';
            const [rows] = await database_1.pool.query(query, [
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
        }
        catch (error) {
            throw new Error(`Error al actualizar factura: ${error instanceof Error ? error.message : error}`);
        }
    }
    // NUEVO MÉTODO: Eliminar factura por ID usando el procedimiento almacenado
    static async eliminarFacturaPorId(idFactura) {
        try {
            const query = 'CALL EliminarFacturaPorId(?)';
            const [rows] = await database_1.pool.query(query, [idFactura]);
            // El procedimiento devuelve un mensaje en el primer elemento del array
            const resultado = rows[0][0];
            if (resultado.mensaje && resultado.mensaje.includes('eliminada correctamente')) {
                return {
                    success: true,
                    message: resultado.mensaje,
                    facturasEliminadas: 1
                };
            }
            else {
                return {
                    success: false,
                    message: resultado.mensaje || 'Error al eliminar la factura'
                };
            }
        }
        catch (error) {
            // Manejar errores específicos de MySQL
            if (error.code === '45000') {
                return {
                    success: false,
                    message: error.sqlMessage || 'La factura no existe'
                };
            }
            throw new Error(`Error al eliminar factura por ID: ${error instanceof Error ? error.message : error}`);
        }
    }
}
exports.default = FacturaCitaModel;
