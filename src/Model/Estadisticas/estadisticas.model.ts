import { pool } from '../../config/database';

export default class EstadisticasModel {
  
  public static async ejecutarProcedimiento(nombreProcedimiento: string, parametros: any[] = []): Promise<any> {
    const placeholders = parametros.map(() => '?').join(',');
    const query = `CALL ${nombreProcedimiento}(${placeholders})`;
    
    try {
      const [rows]: any = await pool.query(query, parametros);
      return rows[0] || [];
    } catch (error) {
      console.error(`Error ejecutando ${nombreProcedimiento}:`, error);
      throw error;
    }
  }

  // Métodos específicos para cada procedimiento
  public static async estadisticasGenerales() {
    return await this.ejecutarProcedimiento('sp_estadisticas_generales_sistema');
  }

  public static async estadisticasCitasMes() {
    return await this.ejecutarProcedimiento('sp_estadisticas_citas_por_mes');
  }

  public static async rankingEspecialidades() {
    return await this.ejecutarProcedimiento('sp_ranking_especialidades');
  }

  public static async ingresosSedeEspecialidad() {
    return await this.ejecutarProcedimiento('sp_ingresos_por_sede_especialidad');
  }

  public static async rankingMedicos() {
    return await this.ejecutarProcedimiento('sp_ranking_medicos_rendimiento');
  }

  public static async serviciosRentables() {
    return await this.ejecutarProcedimiento('sp_servicios_mas_rentables');
  }

  public static async ocupacionSedes() {
    return await this.ejecutarProcedimiento('sp_ocupacion_por_sede');
  }

  public static async estadisticasHistoriasClinicas() {
    return await this.ejecutarProcedimiento('sp_estadisticas_historias_clinicas');
  }

  public static async analisisFinanciero() {
    return await this.ejecutarProcedimiento('sp_analisis_financiero_mensual');
  }

  public static async estadisticasPaciente(cedula: string) {
    return await this.ejecutarProcedimiento('sp_estadisticas_paciente_por_cedula', [cedula]);
  }

  public static async historialClinicoPaciente(cedula: string) {
    return await this.ejecutarProcedimiento('sp_historial_clinico_paciente', [cedula]);
  }

  public static async estadisticasMedico(cedula: string) {
    return await this.ejecutarProcedimiento('sp_estadisticas_medico_por_cedula', [cedula]);
  }

  public static async pacientesAtendidosMedico(cedula: string) {
    return await this.ejecutarProcedimiento('sp_pacientes_atendidos_medico', [cedula]);
  }
}