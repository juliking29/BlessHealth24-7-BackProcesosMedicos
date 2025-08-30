"use strict";
// controller/Cita/cita.controller.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cita_model_1 = __importDefault(require("../../Model/Citas/cita.model"));
class CitaController {
    // Disponibilidad por hora específica
    static async obtenerMedicosDisponiblesPorEspecialidad(req, res) {
        try {
            const filtros = req.body;
            if (!filtros.idEspecialidad || !filtros.fecha || !filtros.hora) {
                res.status(400).json({
                    success: false,
                    mensaje: 'Los campos idEspecialidad, fecha y hora son requeridos'
                });
                return;
            }
            const medicos = await cita_model_1.default.obtenerMedicosDisponiblesPorEspecialidad(filtros);
            res.json({
                success: true,
                data: medicos,
                message: 'Médicos obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener médicos disponibles',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Disponibilidad por rango de fechas
    static async obtenerMedicosDisponiblesPorSedeEspecialidad(req, res) {
        try {
            const filtros = req.body;
            if (!filtros.idSede || !filtros.idEspecialidad || !filtros.fechaInicio || !filtros.fechaFin) {
                res.status(400).json({
                    success: false,
                    mensaje: 'Los campos idSede, idEspecialidad, fechaInicio y fechaFin son requeridos'
                });
                return;
            }
            const medicos = await cita_model_1.default.obtenerMedicosDisponiblesPorSedeEspecialidad(filtros);
            res.json({
                success: true,
                data: medicos,
                message: 'Médicos obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener médicos disponibles',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Horarios disponibles en un día
    static async obtenerMedicosConHorariosDisponibles(req, res) {
        try {
            const filtros = req.body;
            if (!filtros.idSede || !filtros.idEspecialidad || !filtros.fecha) {
                res.status(400).json({
                    success: false,
                    mensaje: 'Los campos idSede, idEspecialidad y fecha son requeridos'
                });
                return;
            }
            const medicos = await cita_model_1.default.obtenerMedicosConHorariosDisponibles(filtros);
            res.json({
                success: true,
                data: medicos,
                message: 'Médicos obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener médicos disponibles',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener todas las citas
    static async obtenerTodos(_req, res) {
        try {
            const citas = await cita_model_1.default.obtenerTodos();
            res.json({
                success: true,
                data: citas,
                message: 'Citas obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las citas',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener una cita por su ID
    static async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const cita = await cita_model_1.default.obtenerPorId(Number(id));
            if (!cita) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Cita no encontrada'
                });
                return;
            }
            res.json({
                success: true,
                data: cita,
                message: 'Cita obtenida correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener la cita',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Crear una nueva cita
    static async crear(req, res) {
        try {
            const cita = req.body;
            // Validaciones básicas
            if (!cita.idPaciente || !cita.idServicio || !cita.idSede || !cita.fechaHora || !cita.motivo) {
                res.status(400).json({
                    success: false,
                    mensaje: 'Faltan campos obligatorios (idPaciente, idServicio, idSede, fechaHora, motivo)'
                });
                return;
            }
            const idCita = await cita_model_1.default.crear(cita);
            res.status(201).json({
                success: true,
                data: { idCita },
                mensaje: 'Cita creada correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al crear la cita',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Actualizar una cita
    static async actualizar(req, res) {
        try {
            const { id } = req.params;
            const cita = req.body;
            // Verificar que la cita existe
            const citaExistente = await cita_model_1.default.obtenerPorId(Number(id));
            if (!citaExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Cita no encontrada'
                });
                return;
            }
            const citaActualizada = await cita_model_1.default.actualizar(Number(id), cita);
            res.json({
                success: true,
                data: citaActualizada,
                mensaje: 'Cita actualizada correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al actualizar la cita',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Cancelar una cita
    static async cancelar(req, res) {
        try {
            const { id } = req.params;
            const { motivoCancelacion } = req.body;
            if (!motivoCancelacion) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El motivo de cancelación es requerido'
                });
                return;
            }
            // Verificar que la cita existe
            const citaExistente = await cita_model_1.default.obtenerPorId(Number(id));
            if (!citaExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Cita no encontrada'
                });
                return;
            }
            await cita_model_1.default.cancelar(Number(id), motivoCancelacion);
            res.json({
                success: true,
                mensaje: 'Cita cancelada correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al cancelar la cita',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Eliminar una cita
    static async eliminar(req, res) {
        try {
            const { id } = req.params;
            // Verificar que la cita existe
            const citaExistente = await cita_model_1.default.obtenerPorId(Number(id));
            if (!citaExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Cita no encontrada'
                });
                return;
            }
            await cita_model_1.default.eliminar(Number(id));
            res.json({
                success: true,
                mensaje: 'Cita eliminada correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al eliminar la cita',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Finalizar una cita
    static async finalizar(req, res) {
        try {
            const { id } = req.params;
            // Verificar que la cita existe
            const citaExistente = await cita_model_1.default.obtenerPorId(Number(id));
            if (!citaExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Cita no encontrada'
                });
                return;
            }
            const resultado = await cita_model_1.default.finalizar(Number(id));
            if (resultado.resultado === 'ERROR') {
                res.status(400).json({
                    success: false,
                    mensaje: resultado.mensaje,
                    data: resultado
                });
            }
            else {
                res.json({
                    success: true,
                    data: resultado,
                    mensaje: 'Cita finalizada correctamente'
                });
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al finalizar la cita',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener todos los médicos con sus especialidades
    static async obtenerTodosMedicosConEspecialidades(_req, res) {
        try {
            const medicos = await cita_model_1.default.obtenerTodosMedicosConEspecialidades();
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
    // Obtener citas por paciente
    static async obtenerCitasPorPaciente(req, res) {
        try {
            const { idPaciente } = req.params;
            const { estado } = req.query;
            if (!idPaciente) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El ID del paciente es requerido'
                });
                return;
            }
            const citas = await cita_model_1.default.obtenerCitasPorPaciente(Number(idPaciente), estado);
            res.json({
                success: true,
                data: citas,
                message: 'Citas del paciente obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las citas del paciente',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener citas por doctor
    static async obtenerCitasPorDoctor(req, res) {
        try {
            const { idMedico } = req.params;
            const { estado, fechaInicio, fechaFin } = req.query;
            if (!idMedico) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El ID del médico es requerido'
                });
                return;
            }
            const citas = await cita_model_1.default.obtenerCitasPorDoctor(Number(idMedico), estado, fechaInicio, fechaFin);
            res.json({
                success: true,
                data: citas,
                message: 'Citas del doctor obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las citas del doctor',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener todas las sedes
    static async obtenerSedes(_req, res) {
        try {
            const sedes = await cita_model_1.default.obtenerSedes();
            res.json({
                success: true,
                data: sedes,
                message: 'Sedes obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las sedes',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener todas las especialidades
    static async obtenerEspecialidades(_req, res) {
        try {
            const especialidades = await cita_model_1.default.obtenerEspecialidades();
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
    // Obtener todos los servicios
    static async obtenerServicios(_req, res) {
        try {
            const servicios = await cita_model_1.default.obtenerServicios();
            res.json({
                success: true,
                data: servicios,
                message: 'Servicios obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener los servicios',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Buscar citas por paciente (con cédula) - POST
    static async buscarCitasPorPaciente(req, res) {
        try {
            const { cedula } = req.params;
            const { fechaInicio, fechaFin } = req.body;
            if (!cedula) {
                res.status(400).json({
                    success: false,
                    mensaje: 'La cédula del paciente es requerida'
                });
                return;
            }
            const citas = await cita_model_1.default.buscarCitasPorPaciente(cedula, fechaInicio || null, fechaFin || null);
            res.json({
                success: true,
                data: citas,
                message: 'Citas del paciente obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las citas del paciente',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Buscar citas por médico (con cédula) - POST
    static async buscarCitasPorMedico(req, res) {
        try {
            const { cedula } = req.params;
            const { fechaInicio, fechaFin } = req.body;
            if (!cedula) {
                res.status(400).json({
                    success: false,
                    mensaje: 'La cédula del médico es requerida'
                });
                return;
            }
            const citas = await cita_model_1.default.buscarCitasPorMedico(cedula, fechaInicio || null, fechaFin || null);
            res.json({
                success: true,
                data: citas,
                message: 'Citas del médico obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las citas del médico',
                error: error instanceof Error ? error.message : error
            });
        }
    }
}
exports.default = CitaController;
