"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const facturaCita_model_1 = __importDefault(require("../../Model/FacturaCita/facturaCita.model"));
class FacturaCitaController {
    // Generar factura desde una cita
    static async generarFactura(req, res) {
        try {
            const { idCita } = req.params;
            if (!idCita) {
                res.status(400).json({
                    success: false,
                    message: 'El ID de la cita es requerido'
                });
                return;
            }
            const result = await facturaCita_model_1.default.generarFacturaCita({ idCita: parseInt(idCita) });
            if (!result.success) {
                res.status(400).json({
                    success: false,
                    message: result.message
                });
                return;
            }
            res.json({
                success: true,
                message: result.message,
                numeroFactura: result.numeroFactura
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al generar factura',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener facturas por cédula de paciente
    static async obtenerFacturasPorCedula(req, res) {
        try {
            const { cedula } = req.params;
            if (!cedula) {
                res.status(400).json({
                    success: false,
                    message: 'La cédula del paciente es requerida'
                });
                return;
            }
            const facturas = await facturaCita_model_1.default.obtenerFacturasPorCedula(cedula);
            res.json({
                success: true,
                data: facturas,
                message: 'Facturas obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener facturas',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async actualizarCita(req, res) {
        try {
            const { idCita } = req.params;
            // Validar que idCita existe y es un número válido
            if (!idCita || isNaN(parseInt(idCita))) {
                res.status(400).json({
                    success: false,
                    message: 'El ID de la cita es requerido y debe ser un número válido'
                });
                return;
            }
            const params = {
                idCita: parseInt(idCita),
                ...req.body
            };
            const mensaje = await facturaCita_model_1.default.actualizarCita(params);
            res.json({
                success: true,
                message: mensaje
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar cita',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener detalles de una cita
    static async obtenerDetallesCita(req, res) {
        try {
            const { idCita } = req.params;
            if (!idCita) {
                res.status(400).json({
                    success: false,
                    message: 'El ID de la cita es requerido'
                });
                return;
            }
            const detalles = await facturaCita_model_1.default.obtenerDetallesCita(parseInt(idCita));
            res.json({
                success: true,
                data: detalles,
                message: 'Detalles de cita obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener detalles de cita',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Eliminar factura
    static async eliminarFactura(req, res) {
        try {
            const { id } = req.params;
            if (!id || isNaN(parseInt(id))) {
                res.status(400).json({
                    success: false,
                    message: 'El ID de la factura es requerido y debe ser un número válido'
                });
                return;
            }
            const resultado = await facturaCita_model_1.default.eliminarFactura(parseInt(id));
            if (resultado.status === 'error') {
                res.status(404).json({
                    success: false,
                    ...resultado
                });
                return;
            }
            res.json({
                success: true,
                ...resultado
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar factura',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async actualizarFactura(req, res) {
        try {
            const { id } = req.params;
            // Validar que el ID existe y es un número válido
            if (!id || isNaN(parseInt(id))) {
                res.status(400).json({
                    success: false,
                    message: 'El ID de la factura es requerido y debe ser un número válido'
                });
                return;
            }
            const params = {
                idFactura: parseInt(id),
                ...req.body
            };
            const resultado = await facturaCita_model_1.default.actualizarFactura(params);
            if (resultado.status === 'error') {
                res.status(404).json({
                    success: false,
                    ...resultado
                });
                return;
            }
            res.json({
                success: resultado.status === 'success',
                ...resultado
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar factura',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // NUEVO MÉTODO: Eliminar factura por ID usando el procedimiento almacenado
    static async eliminarFacturaPorId(req, res) {
        try {
            const { id } = req.params;
            if (!id || isNaN(parseInt(id))) {
                res.status(400).json({
                    success: false,
                    message: 'El ID de la factura es requerido y debe ser un número válido'
                });
                return;
            }
            const resultado = await facturaCita_model_1.default.eliminarFacturaPorId(parseInt(id));
            if (!resultado.success) {
                res.status(404).json({
                    success: false,
                    message: resultado.message
                });
                return;
            }
            res.json({
                success: true,
                message: resultado.message,
                facturasEliminadas: resultado.facturasEliminadas
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar factura por ID',
                error: error instanceof Error ? error.message : error
            });
        }
    }
}
exports.default = FacturaCitaController;
