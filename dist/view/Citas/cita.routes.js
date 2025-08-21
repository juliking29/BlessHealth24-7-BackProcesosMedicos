"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cita_controller_1 = __importDefault(require("../../controller/Citas/cita.controller"));
const router = (0, express_1.Router)();
router.post('/medicos/disponibilidad/hora-especifica', cita_controller_1.default.obtenerMedicosDisponiblesPorEspecialidad);
router.post('/medicos/disponibilidad/rango-fechas', cita_controller_1.default.obtenerMedicosDisponiblesPorSedeEspecialidad);
router.post('/medicos/disponibilidad/horarios-disponibles', cita_controller_1.default.obtenerMedicosConHorariosDisponibles);
router.get('/citas', cita_controller_1.default.obtenerTodos);
router.get('/citas/:id', cita_controller_1.default.obtenerPorId);
router.post('/citas', cita_controller_1.default.crear);
router.put('/citas/:id', cita_controller_1.default.actualizar);
router.put('/citas/:id/cancelar', cita_controller_1.default.cancelar);
router.put('/citas/:id/finalizar', cita_controller_1.default.finalizar);
router.delete('/citas/:id', cita_controller_1.default.eliminar);
router.get('/medicos', cita_controller_1.default.obtenerTodosMedicosConEspecialidades);
router.get('/citas/paciente/:idPaciente', cita_controller_1.default.obtenerCitasPorPaciente);
router.get('/citas/doctor/:idMedico', cita_controller_1.default.obtenerCitasPorDoctor);
router.get('/sedes', cita_controller_1.default.obtenerSedes);
router.get('/especialidades', cita_controller_1.default.obtenerEspecialidades);
router.get('/servicios', cita_controller_1.default.obtenerServicios);
router.post('/citas/buscar/paciente/:cedula', cita_controller_1.default.buscarCitasPorPaciente);
router.post('/citas/buscar/medico/:cedula', cita_controller_1.default.buscarCitasPorMedico);
exports.default = router;
//# sourceMappingURL=cita.routes.js.map