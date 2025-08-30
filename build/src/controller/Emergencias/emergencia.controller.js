"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emergencia_model_1 = __importDefault(require("../../Model/Emergencias/emergencia.model"));
class EmergenciaController {
    static async obtenerTodos(req, res) {
        try {
            const { estado, idSede, idTipoEmergencia, fechaDesde, fechaHasta, limit, offset } = req.query;
            const filtros = {
                estado: estado,
                idSede: idSede ? Number(idSede) : undefined,
                idTipoEmergencia: idTipoEmergencia ? Number(idTipoEmergencia) : undefined,
                fechaDesde: fechaDesde,
                fechaHasta: fechaHasta,
                limit: limit ? Number(limit) : undefined,
                offset: offset ? Number(offset) : undefined
            };
            const [rows, total] = await emergencia_model_1.default.obtenerFiltrado(filtros);
            res.json({ success: true, data: rows, total });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener emergencias', error: error instanceof Error ? error.message : error });
        }
    }
    static async obtenerPorId(req, res) {
        try {
            const id = Number(req.params['id']);
            if (isNaN(id)) {
                res.status(400).json({ success: false, message: 'ID inválido' });
                return;
            }
            const emergencia = await emergencia_model_1.default.obtenerPorId(id);
            if (!emergencia) {
                res.status(404).json({ success: false, message: 'Emergencia no encontrada' });
                return;
            }
            res.json({ success: true, data: emergencia });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener emergencia', error: error instanceof Error ? error.message : error });
        }
    }
    static async crear(req, res) {
        try {
            const body = req.body;
            if (!body.idSede || !body.idTipoEmergencia || !body.fechaHoraLlegada || !body.motivo) {
                res.status(400).json({ success: false, message: 'Faltan datos obligatorios: idSede, idTipoEmergencia, fechaHoraLlegada, motivo' });
                return;
            }
            const idEmergencia = await emergencia_model_1.default.crear(body);
            res.status(201).json({ success: true, data: { idEmergencia }, message: 'Emergencia creada correctamente' });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error al crear emergencia', error: error instanceof Error ? error.message : error });
        }
    }
    static async actualizar(req, res) {
        try {
            const id = Number(req.params['id']);
            if (isNaN(id)) {
                res.status(400).json({ success: false, message: 'ID inválido' });
                return;
            }
            const body = req.body;
            await emergencia_model_1.default.actualizar(id, body);
            res.json({ success: true, message: 'Emergencia actualizada correctamente' });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error al actualizar emergencia', error: error instanceof Error ? error.message : error });
        }
    }
    static async eliminar(req, res) {
        try {
            const id = Number(req.params['id']);
            if (isNaN(id)) {
                res.status(400).json({ success: false, message: 'ID inválido' });
                return;
            }
            await emergencia_model_1.default.eliminar(id);
            res.json({ success: true, message: 'Emergencia eliminada correctamente' });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error al eliminar emergencia', error: error instanceof Error ? error.message : error });
        }
    }
    static async obtenerPorSede(req, res) {
        try {
            const idSede = Number(req.params['idSede']);
            if (isNaN(idSede)) {
                res.status(400).json({ success: false, message: 'idSede inválido' });
                return;
            }
            const rows = await emergencia_model_1.default.obtenerPorSede(idSede);
            res.json({ success: true, data: rows });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error al buscar por sede', error: error instanceof Error ? error.message : error });
        }
    }
    static async obtenerPorTipo(req, res) {
        try {
            const idTipo = Number(req.params['idTipo']);
            if (isNaN(idTipo)) {
                res.status(400).json({ success: false, message: 'idTipo inválido' });
                return;
            }
            const rows = await emergencia_model_1.default.obtenerPorTipo(idTipo);
            res.json({ success: true, data: rows });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error al buscar por tipo', error: error instanceof Error ? error.message : error });
        }
    }
    static async estadisticasPorEstado(_req, res) {
        try {
            const stats = await emergencia_model_1.default.contarPorEstado();
            res.json({ success: true, data: stats });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener estadísticas', error: error instanceof Error ? error.message : error });
        }
    }
    static async asignarMedico(req, res) {
        try {
            const id = Number(req.params['id']);
            const { idMedico } = req.body;
            if (isNaN(id) || typeof idMedico !== 'number') {
                res.status(400).json({ success: false, message: 'ID inválido o idMedico no proporcionado' });
                return;
            }
            await emergencia_model_1.default.asignarMedico(id, idMedico);
            res.json({ success: true, message: 'Médico asignado correctamente' });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error al asignar médico', error: error instanceof Error ? error.message : error });
        }
    }
    static async asignarPaciente(req, res) {
        try {
            const id = Number(req.params['id']);
            const { idPaciente } = req.body;
            if (isNaN(id) || typeof idPaciente !== 'number') {
                res.status(400).json({ success: false, message: 'ID inválido o idPaciente no proporcionado' });
                return;
            }
            await emergencia_model_1.default.asignarPaciente(id, idPaciente);
            res.json({ success: true, message: 'Paciente asignado correctamente' });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error al asignar paciente', error: error instanceof Error ? error.message : error });
        }
    }
    static async marcarAtencion(req, res) {
        try {
            const id = Number(req.params['id']);
            const { fechaHoraAtencion } = req.body;
            if (isNaN(id)) {
                res.status(400).json({ success: false, message: 'ID inválido' });
                return;
            }
            const fecha = fechaHoraAtencion ? String(fechaHoraAtencion) : new Date().toISOString().slice(0, 19).replace('T', ' ');
            await emergencia_model_1.default.marcarAtencion(id, fecha);
            res.json({ success: true, message: 'Atención marcada correctamente' });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error al marcar atención', error: error instanceof Error ? error.message : error });
        }
    }
}
exports.default = EmergenciaController;
