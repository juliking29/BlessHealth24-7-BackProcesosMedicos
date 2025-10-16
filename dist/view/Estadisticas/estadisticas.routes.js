"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estadisticas_controller_1 = __importDefault(require("../../controller/Estadisticas/estadisticas.controller"));
const router = (0, express_1.Router)();
// Dashboard administrativo consolidado - TRAE TODO
router.get('/admin/dashboard', estadisticas_controller_1.default.obtenerDashboardAdmin);
// Rutas individuales para cada estadística
router.get('/admin/estadisticas-generales', estadisticas_controller_1.default.obtenerEstadisticasGenerales);
router.get('/admin/citas-mes', estadisticas_controller_1.default.obtenerCitasPorMes);
router.get('/admin/ranking-especialidades', estadisticas_controller_1.default.obtenerRankingEspecialidades);
router.get('/admin/ingresos-sede-especialidad', estadisticas_controller_1.default.obtenerIngresosSedeEspecialidad);
router.get('/admin/ranking-medicos', estadisticas_controller_1.default.obtenerRankingMedicos);
router.get('/admin/servicios-rentables', estadisticas_controller_1.default.obtenerServiciosRentables);
router.get('/admin/ocupacion-sedes', estadisticas_controller_1.default.obtenerOcupacionSedes);
router.get('/admin/estadisticas-historias-clinicas', estadisticas_controller_1.default.obtenerEstadisticasHistoriasClinicas);
router.get('/admin/analisis-financiero', estadisticas_controller_1.default.obtenerAnalisisFinanciero);
// Estadísticas por paciente
router.get('/admin/estadisticas-paciente/:cedula', estadisticas_controller_1.default.obtenerEstadisticasPaciente);
router.get('/admin/historial-clinico/:cedula', estadisticas_controller_1.default.obtenerHistorialClinicoPaciente);
// Estadísticas por médico
router.get('/admin/estadisticas-medico/:cedula', estadisticas_controller_1.default.obtenerEstadisticasMedico);
router.get('/admin/pacientes-medico/:cedula', estadisticas_controller_1.default.obtenerPacientesAtendidosMedico);
// Ejecutar cualquier procedimiento directamente (para testing)
router.post('/admin/ejecutar-procedimiento', estadisticas_controller_1.default.ejecutarProcedimientoDirecto);
exports.default = router;
