import { Router } from 'express';
import EstadisticasController from '../../controller/Estadisticas/estadisticas.controller';

const router = Router();

// Dashboard administrativo consolidado - TRAE TODO
router.get('/admin/dashboard', EstadisticasController.obtenerDashboardAdmin);

// Rutas individuales para cada estadística
router.get('/admin/estadisticas-generales', EstadisticasController.obtenerEstadisticasGenerales);
router.get('/admin/citas-mes', EstadisticasController.obtenerCitasPorMes);
router.get('/admin/ranking-especialidades', EstadisticasController.obtenerRankingEspecialidades);
router.get('/admin/ingresos-sede-especialidad', EstadisticasController.obtenerIngresosSedeEspecialidad);
router.get('/admin/ranking-medicos', EstadisticasController.obtenerRankingMedicos);
router.get('/admin/servicios-rentables', EstadisticasController.obtenerServiciosRentables);
router.get('/admin/ocupacion-sedes', EstadisticasController.obtenerOcupacionSedes);
router.get('/admin/estadisticas-historias-clinicas', EstadisticasController.obtenerEstadisticasHistoriasClinicas);
router.get('/admin/analisis-financiero', EstadisticasController.obtenerAnalisisFinanciero);

// Estadísticas por paciente
router.get('/admin/estadisticas-paciente/:cedula', EstadisticasController.obtenerEstadisticasPaciente);
router.get('/admin/historial-clinico/:cedula', EstadisticasController.obtenerHistorialClinicoPaciente);

// Estadísticas por médico
router.get('/admin/estadisticas-medico/:cedula', EstadisticasController.obtenerEstadisticasMedico);
router.get('/admin/pacientes-medico/:cedula', EstadisticasController.obtenerPacientesAtendidosMedico);

// Ejecutar cualquier procedimiento directamente (para testing)
router.post('/admin/ejecutar-procedimiento', EstadisticasController.ejecutarProcedimientoDirecto);

export default router;