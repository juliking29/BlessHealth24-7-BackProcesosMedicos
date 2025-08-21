"use strict";
// controller/OrdenMedica/ordenMedica.controller.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ordenMedica_model_1 = __importDefault(require("../../Model/OrdenMedica/ordenMedica.model"));
class OrdenMedicaController {
    static async obtenerPorCedulaPaciente(req, res) {
        try {
            const { numeroDocumento } = req.params;
            if (!numeroDocumento) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El número de documento del paciente es requerido'
                });
                return;
            }
            const ordenes = await ordenMedica_model_1.default.obtenerPorCedulaPaciente(numeroDocumento);
            res.json({
                success: true,
                data: ordenes,
                message: 'Órdenes médicas obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las órdenes médicas',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Crear una nueva orden médica
    static async crear(req, res) {
        try {
            const ordenMedica = req.body;
            if (!ordenMedica.idRegistroConsulta || !ordenMedica.tipoOrden || !ordenMedica.descripcion) {
                res.status(400).json({
                    success: false,
                    mensaje: 'Los campos idRegistroConsulta, tipoOrden y descripcion son requeridos'
                });
                return;
            }
            const idOrdenMedica = await ordenMedica_model_1.default.crear(ordenMedica);
            res.status(201).json({
                success: true,
                data: { idOrdenMedica },
                mensaje: 'Orden médica creada correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al crear la orden médica',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener todas las órdenes médicas
    static async obtenerTodas(_req, res) {
        try {
            const ordenes = await ordenMedica_model_1.default.obtenerTodas();
            res.json({
                success: true,
                data: ordenes,
                message: 'Órdenes médicas obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las órdenes médicas',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener órdenes por paciente
    static async obtenerPorPaciente(req, res) {
        try {
            const { idPaciente } = req.params;
            if (!idPaciente) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El ID del paciente es requerido'
                });
                return;
            }
            const ordenes = await ordenMedica_model_1.default.obtenerPorPaciente(Number(idPaciente));
            res.json({
                success: true,
                data: ordenes,
                message: 'Órdenes médicas obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las órdenes médicas del paciente',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener una orden por ID
    static async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const orden = await ordenMedica_model_1.default.obtenerPorId(Number(id));
            if (!orden) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Orden médica no encontrada'
                });
                return;
            }
            res.json({
                success: true,
                data: orden,
                message: 'Orden médica obtenida correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener la orden médica',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Actualizar una orden médica
    static async actualizar(req, res) {
        try {
            const { id } = req.params;
            const ordenMedica = req.body;
            const ordenExistente = await ordenMedica_model_1.default.obtenerPorId(Number(id));
            if (!ordenExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Orden médica no encontrada'
                });
                return;
            }
            await ordenMedica_model_1.default.actualizar(Number(id), ordenMedica);
            const ordenActualizada = await ordenMedica_model_1.default.obtenerPorId(Number(id));
            res.json({
                success: true,
                data: ordenActualizada,
                mensaje: 'Orden médica actualizada correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al actualizar la orden médica',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Eliminar una orden médica
    static async eliminar(req, res) {
        try {
            const { id } = req.params;
            const ordenExistente = await ordenMedica_model_1.default.obtenerPorId(Number(id));
            if (!ordenExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Orden médica no encontrada'
                });
                return;
            }
            await ordenMedica_model_1.default.eliminar(Number(id));
            res.json({
                success: true,
                mensaje: 'Orden médica eliminada correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al eliminar la orden médica',
                error: error instanceof Error ? error.message : error
            });
        }
    }
}
exports.default = OrdenMedicaController;
