"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const servicio_model_1 = __importDefault(require("../../Model/Servicio/servicio.model"));
class ServicioController {
    // Obtener servicios por especialidad (texto)
    static async obtenerPorEspecialidadTexto(req, res) {
        try {
            const { idEspecialidad } = req.params;
            if (!idEspecialidad || isNaN(parseInt(idEspecialidad))) {
                res.status(400).json({
                    success: false,
                    message: 'El ID de especialidad es requerido y debe ser un número válido'
                });
                return;
            }
            const resultado = await servicio_model_1.default.obtenerServiciosPorEspecialidadTexto(parseInt(idEspecialidad));
            res.json({
                success: true,
                data: resultado,
                message: 'Servicios obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener servicios',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener todos los servicios (texto)
    static async obtenerTodosServiciosTexto(_req, res) {
        try {
            const resultado = await servicio_model_1.default.obtenerTodosServiciosTexto();
            res.json({
                success: true,
                data: resultado,
                message: 'Servicios obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener servicios',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener servicios por especialidad (estructurado)
    static async obtenerPorEspecialidad(req, res) {
        try {
            const { idEspecialidad } = req.params;
            if (!idEspecialidad || isNaN(parseInt(idEspecialidad))) {
                res.status(400).json({
                    success: false,
                    message: 'El ID de especialidad es requerido y debe ser un número válido'
                });
                return;
            }
            const servicios = await servicio_model_1.default.obtenerServiciosPorEspecialidad(parseInt(idEspecialidad));
            res.json({
                success: true,
                data: servicios,
                message: 'Servicios obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener servicios',
                error: error instanceof Error ? error.message : error
            });
        }
    }
}
exports.default = ServicioController;
