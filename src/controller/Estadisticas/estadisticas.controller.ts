import { Request, Response } from 'express';
import EstadisticasModel from '../../Model/Estadisticas/estadisticas.model';


export default class EstadisticasController {

  // Obtener estadísticas generales del sistema
  public static async obtenerEstadisticasGenerales(_req: Request, res: Response): Promise<void> {
    try {
      const data = await EstadisticasModel.estadisticasGenerales();
      res.json({
        success: true,
        data: data,
        message: 'Estadísticas generales obtenidas correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas generales',
        error: error instanceof Error ? error.message : error
      });
    }
  }

  // Obtener estadísticas de citas por mes
  public static async obtenerCitasPorMes(_req: Request, res: Response): Promise<void> {
    try {
      const data = await EstadisticasModel.estadisticasCitasMes();
      res.json({
        success: true,
        data: data,
        message: 'Estadísticas de citas por mes obtenidas correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas de citas por mes',
        error: error instanceof Error ? error.message : error
      });
    }
  }

  // Obtener ranking de especialidades
  public static async obtenerRankingEspecialidades(_req: Request, res: Response): Promise<void> {
    try {
      const data = await EstadisticasModel.rankingEspecialidades();
      res.json({
        success: true,
        data: data,
        message: 'Ranking de especialidades obtenido correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener ranking de especialidades',
        error: error instanceof Error ? error.message : error
      });
    }
  }

  // Obtener ingresos por sede y especialidad
  public static async obtenerIngresosSedeEspecialidad(_req: Request, res: Response): Promise<void> {
    try {
      const data = await EstadisticasModel.ingresosSedeEspecialidad();
      res.json({
        success: true,
        data: data,
        message: 'Ingresos por sede y especialidad obtenidos correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener ingresos por sede y especialidad',
        error: error instanceof Error ? error.message : error
      });
    }
  }

  // Obtener ranking de médicos
  public static async obtenerRankingMedicos(_req: Request, res: Response): Promise<void> {
    try {
      const data = await EstadisticasModel.rankingMedicos();
      res.json({
        success: true,
        data: data,
        message: 'Ranking de médicos obtenido correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener ranking de médicos',
        error: error instanceof Error ? error.message : error
      });
    }
  }

  // Obtener servicios más rentables
  public static async obtenerServiciosRentables(_req: Request, res: Response): Promise<void> {
    try {
      const data = await EstadisticasModel.serviciosRentables();
      res.json({
        success: true,
        data: data,
        message: 'Servicios rentables obtenidos correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener servicios rentables',
        error: error instanceof Error ? error.message : error
      });
    }
  }

  // Obtener ocupación por sede
  public static async obtenerOcupacionSedes(_req: Request, res: Response): Promise<void> {
    try {
      const data = await EstadisticasModel.ocupacionSedes();
      res.json({
        success: true,
        data: data,
        message: 'Ocupación por sede obtenida correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener ocupación por sede',
        error: error instanceof Error ? error.message : error
      });
    }
  }

  // Obtener estadísticas de historias clínicas
  public static async obtenerEstadisticasHistoriasClinicas(_req: Request, res: Response): Promise<void> {
    try {
      const data = await EstadisticasModel.estadisticasHistoriasClinicas();
      res.json({
        success: true,
        data: data,
        message: 'Estadísticas de historias clínicas obtenidas correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas de historias clínicas',
        error: error instanceof Error ? error.message : error
      });
    }
  }

  // Obtener análisis financiero
  public static async obtenerAnalisisFinanciero(_req: Request, res: Response): Promise<void> {
    try {
      const data = await EstadisticasModel.analisisFinanciero();
      res.json({
        success: true,
        data: data,
        message: 'Análisis financiero obtenido correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener análisis financiero',
        error: error instanceof Error ? error.message : error
      });
    }
  }

  // Obtener estadísticas por paciente
  public static async obtenerEstadisticasPaciente(req: Request, res: Response): Promise<void> {
    try {
      const { cedula } = req.params;

      if (!cedula) {
        res.status(400).json({
          success: false,
          message: 'La cédula del paciente es requerida'
        });
        return;
      }

      const data = await EstadisticasModel.estadisticasPaciente(cedula);
      res.json({
        success: true,
        data: data,
        message: 'Estadísticas del paciente obtenidas correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas del paciente',
        error: error instanceof Error ? error.message : error
      });
    }
  }

  // Obtener historial clínico de paciente
  public static async obtenerHistorialClinicoPaciente(req: Request, res: Response): Promise<void> {
    try {
      const { cedula } = req.params;

      if (!cedula) {
        res.status(400).json({
          success: false,
          message: 'La cédula del paciente es requerida'
        });
        return;
      }

      const data = await EstadisticasModel.historialClinicoPaciente(cedula);
      res.json({
        success: true,
        data: data,
        message: 'Historial clínico obtenido correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener historial clínico',
        error: error instanceof Error ? error.message : error
      });
    }
  }

  // Obtener estadísticas por médico
  public static async obtenerEstadisticasMedico(req: Request, res: Response): Promise<void> {
    try {
      const { cedula } = req.params;

      if (!cedula) {
        res.status(400).json({
          success: false,
          message: 'La cédula del médico es requerida'
        });
        return;
      }

      const data = await EstadisticasModel.estadisticasMedico(cedula);
      res.json({
        success: true,
        data: data,
        message: 'Estadísticas del médico obtenidas correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas del médico',
        error: error instanceof Error ? error.message : error
      });
    }
  }

  // Obtener pacientes atendidos por médico
  public static async obtenerPacientesAtendidosMedico(req: Request, res: Response): Promise<void> {
    try {
      const { cedula } = req.params;

      if (!cedula) {
        res.status(400).json({
          success: false,
          message: 'La cédula del médico es requerida'
        });
        return;
      }

      const data = await EstadisticasModel.pacientesAtendidosMedico(cedula);
      res.json({
        success: true,
        data: data,
        message: 'Pacientes atendidos obtenidos correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener pacientes atendidos',
        error: error instanceof Error ? error.message : error
      });
    }
  }

  // Endpoint consolidado para dashboard administrativo - TRAE TODO DE UNA VEZ
  public static async obtenerDashboardAdmin(_req: Request, res: Response): Promise<void> {
    try {
      console.log('📊 Iniciando carga de dashboard administrativo...');
      
      // Ejecutar todos los procedimientos en paralelo
      const [
        estadisticasGenerales,
        citasPorMes,
        rankingEspecialidades,
        ingresosSedeEspecialidad,
        rankingMedicos,
        serviciosRentables,
        ocupacionSedes,
        estadisticasHC,
        analisisFinanciero
      ] = await Promise.all([
        EstadisticasModel.estadisticasGenerales(),
        EstadisticasModel.estadisticasCitasMes(),
        EstadisticasModel.rankingEspecialidades(),
        EstadisticasModel.ingresosSedeEspecialidad(),
        EstadisticasModel.rankingMedicos(),
        EstadisticasModel.serviciosRentables(),
        EstadisticasModel.ocupacionSedes(),
        EstadisticasModel.estadisticasHistoriasClinicas(),
        EstadisticasModel.analisisFinanciero()
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
    } catch (error) {
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
  public static async ejecutarProcedimientoDirecto(req: Request, res: Response): Promise<void> {
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
      
      const data = await EstadisticasModel.ejecutarProcedimiento(procedimiento, parametros);
      
      res.json({
        success: true,
        data: data,
        message: `Procedimiento ${procedimiento} ejecutado correctamente`
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error ejecutando procedimiento',
        error: error instanceof Error ? error.message : error
      });
    }
  }
}