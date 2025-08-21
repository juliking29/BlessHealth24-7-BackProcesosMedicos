"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const historiaClinica_model_1 = __importDefault(require("../../Model/HistoriaClinica/historiaClinica.model"));
class HistoriaClinicaController {
    static async obtenerPorDocumentoPaciente(req, res) {
        try {
            const { documento } = req.params;
            if (!documento) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El número de documento es requerido'
                });
                return;
            }
            const historias = await historiaClinica_model_1.default.obtenerPorDocumentoPaciente(documento);
            if (historias.length === 0) {
                res.status(404).json({
                    success: false,
                    mensaje: 'No se encontraron historias clínicas para este paciente'
                });
                return;
            }
            res.json({
                success: true,
                data: historias,
                message: 'Historias clínicas obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener historias clínicas por documento',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async obtenerTodos(_req, res) {
        try {
            const historias = await historiaClinica_model_1.default.obtenerTodos();
            res.json({
                success: true,
                data: historias,
                message: 'Historias clínicas obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las historias clínicas',
                error: error instanceof Error ? error.message : error
            });
        }
    }
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
            const historias = await historiaClinica_model_1.default.obtenerPorPaciente(Number(idPaciente));
            res.json({
                success: true,
                data: historias,
                message: 'Historias clínicas obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener historias clínicas por paciente',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const historia = await historiaClinica_model_1.default.obtenerPorId(Number(id));
            if (!historia) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Historia clínica no encontrada'
                });
                return;
            }
            res.json({
                success: true,
                data: historia,
                message: 'Historia clínica obtenida correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener la historia clínica',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async crear(req, res) {
        try {
            const historia = req.body;
            if (!historia.idPaciente) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El ID del paciente es obligatorio'
                });
                return;
            }
            const idHistoria = await historiaClinica_model_1.default.crear(historia);
            const historiaCreada = await historiaClinica_model_1.default.obtenerPorId(idHistoria);
            res.status(201).json({
                success: true,
                data: historiaCreada,
                mensaje: 'Historia clínica creada correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al crear la historia clínica',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async actualizar(req, res) {
        try {
            const { id } = req.params;
            const historia = req.body;
            const historiaExistente = await historiaClinica_model_1.default.obtenerPorId(Number(id));
            if (!historiaExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Historia clínica no encontrada'
                });
                return;
            }
            const historiaActualizada = await historiaClinica_model_1.default.actualizar(Number(id), historia);
            res.json({
                success: true,
                data: historiaActualizada,
                mensaje: 'Historia clínica actualizada correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al actualizar la historia clínica',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async eliminar(req, res) {
        try {
            const { id } = req.params;
            const historiaExistente = await historiaClinica_model_1.default.obtenerPorId(Number(id));
            if (!historiaExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Historia clínica no encontrada'
                });
                return;
            }
            await historiaClinica_model_1.default.eliminar(Number(id));
            res.json({
                success: true,
                mensaje: 'Historia clínica eliminada correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al eliminar la historia clínica',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async obtenerHistorialCompleto(req, res) {
        try {
            const { idPaciente } = req.params;
            if (!idPaciente) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El ID del paciente es requerido'
                });
                return;
            }
            const historias = await historiaClinica_model_1.default.obtenerPorPaciente(Number(idPaciente));
            if (historias.length === 0) {
                res.status(404).json({
                    success: false,
                    mensaje: 'No se encontró historial clínico para este paciente'
                });
                return;
            }
            res.json({
                success: true,
                data: historias,
                message: 'Historial clínico obtenido correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener el historial clínico',
                error: error instanceof Error ? error.message : error
            });
        }
    }
}
exports.default = HistoriaClinicaController;
//# sourceMappingURL=historiaClinica.controller.js.map