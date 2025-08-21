"use strict";
// controller/RegistroConsulta/registroConsulta.controller.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registroConsulta_model_1 = __importDefault(require("../../Model/RegistroConsulta/registroConsulta.model"));
class RegistroConsultaController {
    // Crear un nuevo registro de consulta
    static async crear(req, res) {
        try {
            const registro = req.body;
            // Validaciones básicas
            if (!registro.idHistoriaClinica || !registro.idMedico || !registro.fechaConsulta || !registro.motivoConsulta) {
                res.status(400).json({
                    success: false,
                    mensaje: 'Los campos idHistoriaClinica, idMedico, fechaConsulta y motivoConsulta son requeridos'
                });
                return;
            }
            const idRegistro = await registroConsulta_model_1.default.crear(registro);
            res.status(201).json({
                success: true,
                data: { idRegistroConsulta: idRegistro },
                mensaje: 'Registro de consulta creado correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al crear el registro de consulta',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener todos los registros
    static async obtenerTodos(_req, res) {
        try {
            const registros = await registroConsulta_model_1.default.obtenerTodos();
            res.json({
                success: true,
                data: registros,
                message: 'Registros de consulta obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener los registros de consulta',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener registros por cédula del paciente
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
            const registros = await registroConsulta_model_1.default.obtenerPorCedulaPaciente(numeroDocumento);
            res.json({
                success: true,
                data: registros,
                message: 'Registros de consulta obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener los registros de consulta',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener registros por ID de cita
    static async obtenerPorIdCita(req, res) {
        try {
            const { idCita } = req.params;
            if (!idCita) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El ID de la cita es requerido'
                });
                return;
            }
            const registros = await registroConsulta_model_1.default.obtenerPorIdCita(Number(idCita));
            res.json({
                success: true,
                data: registros,
                message: 'Registros de consulta obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener los registros de consulta',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener un registro por ID
    static async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const registro = await registroConsulta_model_1.default.obtenerPorId(Number(id));
            if (!registro) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Registro de consulta no encontrado'
                });
                return;
            }
            res.json({
                success: true,
                data: registro,
                message: 'Registro de consulta obtenido correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener el registro de consulta',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Actualizar un registro
    static async actualizar(req, res) {
        try {
            const { id } = req.params;
            const registro = req.body;
            const registroExistente = await registroConsulta_model_1.default.obtenerPorId(Number(id));
            if (!registroExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Registro de consulta no encontrado'
                });
                return;
            }
            await registroConsulta_model_1.default.actualizar(Number(id), registro);
            const registroActualizado = await registroConsulta_model_1.default.obtenerPorId(Number(id));
            res.json({
                success: true,
                data: registroActualizado,
                mensaje: 'Registro de consulta actualizado correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al actualizar el registro de consulta',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Eliminar un registro
    static async eliminar(req, res) {
        try {
            const { id } = req.params;
            const registroExistente = await registroConsulta_model_1.default.obtenerPorId(Number(id));
            if (!registroExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Registro de consulta no encontrado'
                });
                return;
            }
            await registroConsulta_model_1.default.eliminar(Number(id));
            res.json({
                success: true,
                mensaje: 'Registro de consulta eliminado correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al eliminar el registro de consulta',
                error: error instanceof Error ? error.message : error
            });
        }
    }
}
exports.default = RegistroConsultaController;
