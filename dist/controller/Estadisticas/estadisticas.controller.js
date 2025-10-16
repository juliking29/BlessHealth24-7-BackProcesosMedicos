"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const estadisticas_model_1 = __importDefault(require("../../Model/Estadisticas/estadisticas.model"));
class EstadisticasController {
    // Obtener estadísticas generales del sistema
    static async obtenerEstadisticasGenerales(_req, res) {
        try {
            const data = await estadisticas_model_1.default.estadisticasGenerales();
            res.json({
                success: true,
                data: data,
                message: 'Estadísticas generales obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener estadísticas generales',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener estadísticas de citas por mes
    static async obtenerCitasPorMes(_req, res) {
        try {
            const data = await estadisticas_model_1.default.estadisticasCitasMes();
            res.json({
                success: true,
                data: data,
                message: 'Estadísticas de citas por mes obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener estadísticas de citas por mes',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener ranking de especialidades
    static async obtenerRankingEspecialidades(_req, res) {
        try {
            const data = await estadisticas_model_1.default.rankingEspecialidades();
            res.json({
                success: true,
                data: data,
                message: 'Ranking de especialidades obtenido correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener ranking de especialidades',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener ingresos por sede y especialidad
    static async obtenerIngresosSedeEspecialidad(_req, res) {
        try {
            const data = await estadisticas_model_1.default.ingresosSedeEspecialidad();
            res.json({
                success: true,
                data: data,
                message: 'Ingresos por sede y especialidad obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener ingresos por sede y especialidad',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener ranking de médicos
    static async obtenerRankingMedicos(_req, res) {
        try {
            const data = await estadisticas_model_1.default.rankingMedicos();
            res.json({
                success: true,
                data: data,
                message: 'Ranking de médicos obtenido correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener ranking de médicos',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener servicios más rentables
    static async obtenerServiciosRentables(_req, res) {
        try {
            const data = await estadisticas_model_1.default.serviciosRentables();
            res.json({
                success: true,
                data: data,
                message: 'Servicios rentables obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener servicios rentables',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener ocupación por sede
    static async obtenerOcupacionSedes(_req, res) {
        try {
            const data = await estadisticas_model_1.default.ocupacionSedes();
            res.json({
                success: true,
                data: data,
                message: 'Ocupación por sede obtenida correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener ocupación por sede',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener estadísticas de historias clínicas
    static async obtenerEstadisticasHistoriasClinicas(_req, res) {
        try {
            const data = await estadisticas_model_1.default.estadisticasHistoriasClinicas();
            res.json({
                success: true,
                data: data,
                message: 'Estadísticas de historias clínicas obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener estadísticas de historias clínicas',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener análisis financiero
    static async obtenerAnalisisFinanciero(_req, res) {
        try {
            const data = await estadisticas_model_1.default.analisisFinanciero();
            res.json({
                success: true,
                data: data,
                message: 'Análisis financiero obtenido correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener análisis financiero',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener estadísticas por paciente
    static async obtenerEstadisticasPaciente(req, res) {
        try {
            const { cedula } = req.params;
            if (!cedula) {
                res.status(400).json({
                    success: false,
                    message: 'La cédula del paciente es requerida'
                });
                return;
            }
            const data = await estadisticas_model_1.default.estadisticasPaciente(cedula);
            res.json({
                success: true,
                data: data,
                message: 'Estadísticas del paciente obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener estadísticas del paciente',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener historial clínico de paciente
    static async obtenerHistorialClinicoPaciente(req, res) {
        try {
            const { cedula } = req.params;
            if (!cedula) {
                res.status(400).json({
                    success: false,
                    message: 'La cédula del paciente es requerida'
                });
                return;
            }
            const data = await estadisticas_model_1.default.historialClinicoPaciente(cedula);
            res.json({
                success: true,
                data: data,
                message: 'Historial clínico obtenido correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener historial clínico',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener estadísticas por médico
    static async obtenerEstadisticasMedico(req, res) {
        try {
            const { cedula } = req.params;
            if (!cedula) {
                res.status(400).json({
                    success: false,
                    message: 'La cédula del médico es requerida'
                });
                return;
            }
            const data = await estadisticas_model_1.default.estadisticasMedico(cedula);
            res.json({
                success: true,
                data: data,
                message: 'Estadísticas del médico obtenidas correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener estadísticas del médico',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Obtener pacientes atendidos por médico
    static async obtenerPacientesAtendidosMedico(req, res) {
        try {
            const { cedula } = req.params;
            if (!cedula) {
                res.status(400).json({
                    success: false,
                    message: 'La cédula del médico es requerida'
                });
                return;
            }
            const data = await estadisticas_model_1.default.pacientesAtendidosMedico(cedula);
            res.json({
                success: true,
                data: data,
                message: 'Pacientes atendidos obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener pacientes atendidos',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Endpoint consolidado para dashboard administrativo - TRAE TODO DE UNA VEZ
    static async obtenerDashboardAdmin(_req, res) {
        try {
            console.log('📊 Iniciando carga de dashboard administrativo...');
            // Ejecutar todos los procedimientos en paralelo
            const [estadisticasGenerales, citasPorMes, rankingEspecialidades, ingresosSedeEspecialidad, rankingMedicos, serviciosRentables, ocupacionSedes, estadisticasHC, analisisFinanciero] = await Promise.all([
                estadisticas_model_1.default.estadisticasGenerales(),
                estadisticas_model_1.default.estadisticasCitasMes(),
                estadisticas_model_1.default.rankingEspecialidades(),
                estadisticas_model_1.default.ingresosSedeEspecialidad(),
                estadisticas_model_1.default.rankingMedicos(),
                estadisticas_model_1.default.serviciosRentables(),
                estadisticas_model_1.default.ocupacionSedes(),
                estadisticas_model_1.default.estadisticasHistoriasClinicas(),
                estadisticas_model_1.default.analisisFinanciero()
            ]);
            console.log('✅ Dashboard administrativo cargado exitosamente');
            res.json({
                success: true,
                data: {
                    estadisticasGenerales: estadisticasGenerales || [],
                    citasPorMes: citasPorMes || [],
                    rankingEspecialidades: rankingEspecialidades || [],
                    ingresosSedeEspecialidad: ingresosSedeEspecialidad || [],
                    rankingMedicos: rankingMedicos || [],
                    serviciosRentables: serviciosRentables || [],
                    ocupacionSedes: ocupacionSedes || [],
                    estadisticasHistoriasClinicas: estadisticasHC || [],
                    analisisFinanciero: analisisFinanciero || []
                },
                message: 'Dashboard administrativo obtenido correctamente',
                timestamp: new Date().toISOString()
            });
        }
        catch (error) {
            console.error('❌ Error cargando dashboard:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener dashboard administrativo',
                error: error instanceof Error ? error.message : 'Error desconocido',
                timestamp: new Date().toISOString()
            });
        }
    }
    // Endpoint para ejecutar cualquier procedimiento directamente
    static async ejecutarProcedimientoDirecto(req, res) {
        try {
            const { procedimiento, parametros = [] } = req.body;
            if (!procedimiento) {
                res.status(400).json({
                    success: false,
                    message: 'El nombre del procedimiento es requerido'
                });
                return;
            }
            console.log(`🔧 Ejecutando procedimiento: ${procedimiento}`, parametros);
            const data = await estadisticas_model_1.default.ejecutarProcedimiento(procedimiento, parametros);
            res.json({
                success: true,
                data: data,
                message: `Procedimiento ${procedimiento} ejecutado correctamente`
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error ejecutando procedimiento',
                error: error instanceof Error ? error.message : error
            });
        }
    }
}
exports.default = EstadisticasController;
