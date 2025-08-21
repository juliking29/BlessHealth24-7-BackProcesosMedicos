"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../config/database");
class FacturaCitaModel {
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
    static async obtenerFacturasPorCedula(cedula) {
        try {
            const query = 'CALL VerFacturasPorCedula(?)';
            const [rows] = await database_1.pool.query(query, [cedula]);
            return rows[0];
        }
        catch (error) {
            throw new Error(`Error al obtener facturas por cédula: ${error instanceof Error ? error.message : error}`);
        }
    }
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
            return rows[0][0].mensaje;
        }
        catch (error) {
            throw new Error(`Error al actualizar cita: ${error instanceof Error ? error.message : error}`);
        }
    }
    static async obtenerDetallesCita(idCita) {
        try {
            const query = 'CALL ObtenerDetallesCita(?)';
            const [rows] = await database_1.pool.query(query, [idCita]);
            if (rows[0].length === 0) {
                throw new Error('Cita no encontrada');
            }
            return rows[0][0];
        }
        catch (error) {
            throw new Error(`Error al obtener detalles de cita: ${error instanceof Error ? error.message : error}`);
        }
    }
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
    static async actualizarFactura(params) {
        try {
            const query = 'CALL sp_actualizar_factura(?, ?, ?, ?, ?, ?, ?, ?, @resultado); SELECT @resultado AS resultado';
            const [rows] = await database_1.pool.query(query, [
                params.idFactura,
                params.idCita || 0,
                params.idEmergencia || 0,
                params.concepto || null,
                params.detalles || null,
                params.fechaVencimiento || null,
                params.subtotal || null,
                params.observaciones || null
            ]);
            const resultado = JSON.parse(rows[1][0].resultado);
            return resultado;
        }
        catch (error) {
            throw new Error(`Error al actualizar factura: ${error instanceof Error ? error.message : error}`);
        }
    }
}
exports.default = FacturaCitaModel;
//# sourceMappingURL=facturaCita.model.js.map