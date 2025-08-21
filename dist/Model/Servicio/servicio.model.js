"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../config/database");
class ServicioModel {
    static async obtenerServiciosPorEspecialidadTexto(idEspecialidad) {
        try {
            const query = 'SELECT fn_servicios_por_especialidad(?) AS resultado';
            const [rows] = await database_1.pool.query(query, [idEspecialidad]);
            return {
                texto: rows[0].resultado || 'No se encontraron resultados'
            };
        }
        catch (error) {
            throw new Error(`Error al obtener servicios por especialidad: ${error instanceof Error ? error.message : error}`);
        }
    }
    static async obtenerTodosServiciosTexto() {
        try {
            const query = 'SELECT fn_todos_servicios_con_precios() AS resultado';
            const [rows] = await database_1.pool.query(query);
            return {
                texto: rows[0].resultado || 'No se encontraron resultados'
            };
        }
        catch (error) {
            throw new Error(`Error al obtener todos los servicios: ${error instanceof Error ? error.message : error}`);
        }
    }
    static async obtenerServiciosPorEspecialidad(idEspecialidad) {
        try {
            const query = 'CALL VerPreciosEspecialidad(?)';
            const [rows] = await database_1.pool.query(query, [idEspecialidad]);
            return rows[0];
        }
        catch (error) {
            throw new Error(`Error al obtener servicios por especialidad: ${error instanceof Error ? error.message : error}`);
        }
    }
}
exports.default = ServicioModel;
//# sourceMappingURL=servicio.model.js.map