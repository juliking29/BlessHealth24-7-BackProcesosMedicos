"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const medico_model_1 = __importDefault(require("../../Model/Uusario/medico.model"));
class MedicoController {
    static async obtenerTodos(_req, res) {
        try {
            const medicos = await medico_model_1.default.obtenerTodos();
            res.json({
                success: true,
                data: medicos,
                message: 'Médicos obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener los médicos',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async obtenerPorEspecialidad(req, res) {
        try {
            const { idEspecialidad } = req.params;
            if (!idEspecialidad) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El ID de la especialidad es requerido'
                });
                return;
            }
            const medicos = await medico_model_1.default.obtenerPorEspecialidad(Number(idEspecialidad));
            res.json({
                success: true,
                data: medicos,
                message: 'Médicos obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener médicos por especialidad',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async obtenerPorSede(req, res) {
        try {
            const { idSede } = req.params;
            if (!idSede) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El ID de la sede es requerido'
                });
                return;
            }
            const medicos = await medico_model_1.default.obtenerPorSede(Number(idSede));
            res.json({
                success: true,
                data: medicos,
                message: 'Médicos obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener médicos por sede',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const medico = await medico_model_1.default.obtenerPorId(Number(id));
            if (!medico) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Médico no encontrado'
                });
                return;
            }
            res.json({
                success: true,
                data: medico,
                message: 'Médico obtenido correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener el médico',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async obtenerPorDocumento(req, res) {
        try {
            const { numeroDocumento } = req.params;
            if (!numeroDocumento) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El número de documento es requerido'
                });
                return;
            }
            const medico = await medico_model_1.default.obtenerPorDocumento(numeroDocumento);
            if (!medico) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Médico no encontrado'
                });
                return;
            }
            res.json({
                success: true,
                data: medico,
                message: 'Médico obtenido correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener el médico por documento',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async obtenerPorRegistroMedico(req, res) {
        try {
            const { registroMedico } = req.params;
            if (!registroMedico) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El registro médico es requerido'
                });
                return;
            }
            const medico = await medico_model_1.default.obtenerPorRegistroMedico(registroMedico);
            if (!medico) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Médico no encontrado'
                });
                return;
            }
            res.json({
                success: true,
                data: medico,
                message: 'Médico obtenido correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener el médico por registro médico',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async buscarPorNombre(req, res) {
        try {
            const { nombre } = req.params;
            if (!nombre) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El nombre es requerido'
                });
                return;
            }
            const medicos = await medico_model_1.default.buscarPorNombre(nombre);
            res.json({
                success: true,
                data: medicos,
                message: 'Médicos encontrados correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al buscar médicos por nombre',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async crear(req, res) {
        try {
            const medico = req.body;
            if (!medico.idMedico || !medico.idEspecialidad || !medico.registroMedico ||
                !medico.universidad || !medico.anioGraduacion) {
                res.status(400).json({
                    success: false,
                    mensaje: 'Faltan campos obligatorios'
                });
                return;
            }
            const medicoExistente = await medico_model_1.default.obtenerPorRegistroMedico(medico.registroMedico);
            if (medicoExistente) {
                res.status(409).json({
                    success: false,
                    mensaje: 'Ya existe un médico con ese registro médico'
                });
                return;
            }
            await medico_model_1.default.crear(medico);
            res.status(201).json({
                success: true,
                mensaje: 'Médico creado correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al crear el médico',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async actualizar(req, res) {
        try {
            const { id } = req.params;
            const medico = req.body;
            const medicoExistente = await medico_model_1.default.obtenerPorId(Number(id));
            if (!medicoExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Médico no encontrado'
                });
                return;
            }
            if (medico.registroMedico && medico.registroMedico !== medicoExistente.registroMedico) {
                const medicoConMismoRegistro = await medico_model_1.default.obtenerPorRegistroMedico(medico.registroMedico);
                if (medicoConMismoRegistro && medicoConMismoRegistro.idMedico !== Number(id)) {
                    res.status(409).json({
                        success: false,
                        mensaje: 'Ya existe otro médico con ese registro médico'
                    });
                    return;
                }
            }
            await medico_model_1.default.actualizar(Number(id), medico);
            res.json({
                success: true,
                mensaje: 'Médico actualizado correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al actualizar el médico',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async eliminar(req, res) {
        try {
            const { id } = req.params;
            const medicoExistente = await medico_model_1.default.obtenerPorId(Number(id));
            if (!medicoExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Médico no encontrado'
                });
                return;
            }
            await medico_model_1.default.eliminar(Number(id));
            res.json({
                success: true,
                mensaje: 'Médico eliminado correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al eliminar el médico',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async eliminarFisicamente(req, res) {
        try {
            const { id } = req.params;
            const medicoExistente = await medico_model_1.default.obtenerPorId(Number(id));
            if (!medicoExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Médico no encontrado'
                });
                return;
            }
            await medico_model_1.default.eliminarFisicamente(Number(id));
            res.json({
                success: true,
                mensaje: 'Médico eliminado físicamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al eliminar físicamente el médico',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    static async obtenerEspecialidades(_req, res) {
        try {
            const especialidades = await medico_model_1.default.obtenerEspecialidades();
            res.json({
                success: true,
                data: especialidades,
                message: 'Especialidades obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las especialidades',
                error: error instanceof Error ? error.message : error
            });
        }
    }
}
exports.default = MedicoController;
//# sourceMappingURL=medico.controller.js.map