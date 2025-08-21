"use strict";
// routes/Cita/cita.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cita_controller_1 = __importDefault(require("../../controller/Citas/cita.controller"));
const router = (0, express_1.Router)();
// Disponibilidad por hora específica
router.post('/medicos/disponibilidad/hora-especifica', cita_controller_1.default.obtenerMedicosDisponiblesPorEspecialidad);
// Disponibilidad por rango de fechas
router.post('/medicos/disponibilidad/rango-fechas', cita_controller_1.default.obtenerMedicosDisponiblesPorSedeEspecialidad);
// Horarios disponibles en un día
router.post('/medicos/disponibilidad/horarios-disponibles', cita_controller_1.default.obtenerMedicosConHorariosDisponibles);
// Obtener todas las citas
router.get('/citas', cita_controller_1.default.obtenerTodos);
// Obtener una cita por su ID
router.get('/citas/:id', cita_controller_1.default.obtenerPorId);
// Crear una nueva cita
router.post('/citas', cita_controller_1.default.crear);
// Actualizar una cita
router.put('/citas/:id', cita_controller_1.default.actualizar);
// Cancelar una cita
router.put('/citas/:id/cancelar', cita_controller_1.default.cancelar);
// Finalizar una cita
router.put('/citas/:id/finalizar', cita_controller_1.default.finalizar);
// Eliminar una cita
router.delete('/citas/:id', cita_controller_1.default.eliminar);
// Obtener todos los médicos con sus especialidades
router.get('/medicos', cita_controller_1.default.obtenerTodosMedicosConEspecialidades);
router.get('/citas/paciente/:idPaciente', cita_controller_1.default.obtenerCitasPorPaciente);
// Obtener citas por doctor
router.get('/citas/doctor/:idMedico', cita_controller_1.default.obtenerCitasPorDoctor);
// Obtener todas las sedes
router.get('/sedes', cita_controller_1.default.obtenerSedes);
// Obtener todas las especialidades
router.get('/especialidades', cita_controller_1.default.obtenerEspecialidades);
// Obtener todos los servicios
router.get('/servicios', cita_controller_1.default.obtenerServicios);
// Buscar citas por paciente (con cédula) - POST
router.post('/citas/buscar/paciente/:cedula', cita_controller_1.default.buscarCitasPorPaciente);
// Buscar citas por médico (con cédula) - POST
router.post('/citas/buscar/medico/:cedula', cita_controller_1.default.buscarCitasPorMedico);
exports.default = router;
