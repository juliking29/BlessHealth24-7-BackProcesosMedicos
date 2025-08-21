"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const autorizacion_model_1 = __importDefault(require("../../Model/OrdenMedica/autorizacion.model"));
class AutorizacionController {
    static async crear(req, res) {
        try {
            const autorizacion = req.body;
            if (!autorizacion.idOrdenMedica || !autorizacion.idAutorizador || !autorizacion.estadoAutorizacion) {
                res.status(400).json({
                    success: false,
                    mensaje: 'Los campos idOrdenMedica, idAutorizador y estadoAutorizacion son requeridos'
                });
                return;
            }
            const idAutorizacion = await autorizacion_model_1.default.crear(autorizacion);
            res.status(201).json({
                success: true,
                data: { idAutorizacion },
                mensaje: 'Autorización creada correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al crear la autorización',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async obtenerTodas(_req, res) {
        try {
            const autorizaciones = await autorizacion_model_1.default.obtenerTodas();
            res.json({
                success: true,
                data: autorizaciones,
                message: 'Autorizaciones obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las autorizaciones',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async obtenerPorOrdenMedica(req, res) {
        try {
            const { idOrdenMedica } = req.params;
            if (!idOrdenMedica) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El ID de la orden médica es requerido'
                });
                return;
            }
            const autorizaciones = await autorizacion_model_1.default.obtenerPorOrdenMedica(Number(idOrdenMedica));
            res.json({
                success: true,
                data: autorizaciones,
                message: 'Autorizaciones obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las autorizaciones',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const autorizacion = await autorizacion_model_1.default.obtenerPorId(Number(id));
            if (!autorizacion) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Autorización no encontrada'
                });
                return;
            }
            res.json({
                success: true,
                data: autorizacion,
                message: 'Autorización obtenida correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener la autorización',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async actualizar(req, res) {
        try {
            const { id } = req.params;
            const autorizacion = req.body;
            const autorizacionExistente = await autorizacion_model_1.default.obtenerPorId(Number(id));
            if (!autorizacionExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Autorización no encontrada'
                });
                return;
            }
            await autorizacion_model_1.default.actualizar(Number(id), autorizacion);
            const autorizacionActualizada = await autorizacion_model_1.default.obtenerPorId(Number(id));
            res.json({
                success: true,
                data: autorizacionActualizada,
                mensaje: 'Autorización actualizada correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al actualizar la autorización',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async eliminar(req, res) {
        try {
            const { id } = req.params;
            const autorizacionExistente = await autorizacion_model_1.default.obtenerPorId(Number(id));
            if (!autorizacionExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Autorización no encontrada'
                });
                return;
            }
            await autorizacion_model_1.default.eliminar(Number(id));
            res.json({
                success: true,
                mensaje: 'Autorización eliminada correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al eliminar la autorización',
                error: error instanceof Error ? error.message : error
            });
        }
    }
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
            const autorizaciones = await autorizacion_model_1.default.obtenerPorCedulaPaciente(numeroDocumento);
            res.json({
                success: true,
                data: autorizaciones,
                message: 'Autorizaciones obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las autorizaciones',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async obtenerPorCedulaDoctor(req, res) {
        try {
            const { numeroDocumento } = req.params;
            if (!numeroDocumento) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El número de documento del doctor es requerido'
                });
                return;
            }
            const autorizaciones = await autorizacion_model_1.default.obtenerPorCedulaDoctor(numeroDocumento);
            res.json({
                success: true,
                data: autorizaciones,
                message: 'Autorizaciones obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las autorizaciones',
                error: error instanceof Error ? error.message : error
            });
        }
    }
}
exports.default = AutorizacionController;
//# sourceMappingURL=autorizacion.controller.js.map