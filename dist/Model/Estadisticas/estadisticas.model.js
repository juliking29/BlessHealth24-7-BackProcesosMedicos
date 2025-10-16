"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../config/database");
class EstadisticasModel {
    static async ejecutarProcedimiento(nombreProcedimiento, parametros = []) {
        const placeholders = parametros.map(() => '?').join(',');
        const query = `CALL ${nombreProcedimiento}(${placeholders})`;
        try {
            const [rows] = await database_1.pool.query(query, parametros);
            return rows[0] || [];
        }
        catch (error) {
            console.error(`Error ejecutando ${nombreProcedimiento}:`, error);
            throw error;
        }
    }
    // Métodos específicos para cada procedimiento
    static async estadisticasGenerales() {
        return await this.ejecutarProcedimiento('sp_estadisticas_generales_sistema');
    }
    static async estadisticasCitasMes() {
        return await this.ejecutarProcedimiento('sp_estadisticas_citas_por_mes');
    }
    static async rankingEspecialidades() {
        return await this.ejecutarProcedimiento('sp_ranking_especialidades');
    }
    static async ingresosSedeEspecialidad() {
        return await this.ejecutarProcedimiento('sp_ingresos_por_sede_especialidad');
    }
    static async rankingMedicos() {
        return await this.ejecutarProcedimiento('sp_ranking_medicos_rendimiento');
    }
    static async serviciosRentables() {
        return await this.ejecutarProcedimiento('sp_servicios_mas_rentables');
    }
    static async ocupacionSedes() {
        return await this.ejecutarProcedimiento('sp_ocupacion_por_sede');
    }
    static async estadisticasHistoriasClinicas() {
        return await this.ejecutarProcedimiento('sp_estadisticas_historias_clinicas');
    }
    static async analisisFinanciero() {
        return await this.ejecutarProcedimiento('sp_analisis_financiero_mensual');
    }
    static async estadisticasPaciente(cedula) {
        return await this.ejecutarProcedimiento('sp_estadisticas_paciente_por_cedula', [cedula]);
    }
    static async historialClinicoPaciente(cedula) {
        return await this.ejecutarProcedimiento('sp_historial_clinico_paciente', [cedula]);
    }
    static async estadisticasMedico(cedula) {
        return await this.ejecutarProcedimiento('sp_estadisticas_medico_por_cedula', [cedula]);
    }
    static async pacientesAtendidosMedico(cedula) {
        return await this.ejecutarProcedimiento('sp_pacientes_atendidos_medico', [cedula]);
    }
}
exports.default = EstadisticasModel;
