"use strict";
// interfaces/OrdenMedica/ordenMedica.interface.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoOrden = exports.TipoOrden = void 0;
var TipoOrden;
(function (TipoOrden) {
    TipoOrden["PROCEDIMIENTO"] = "Procedimiento";
    TipoOrden["EXAMEN"] = "Examen";
    TipoOrden["MEDICAMENTO"] = "Medicamento";
    TipoOrden["TERAPIA"] = "Terapia";
    TipoOrden["INTERCONSULTA"] = "Interconsulta";
})(TipoOrden || (exports.TipoOrden = TipoOrden = {}));
var EstadoOrden;
(function (EstadoOrden) {
    EstadoOrden["PENDIENTE"] = "Pendiente";
    EstadoOrden["COMPLETADA"] = "Completada";
    EstadoOrden["CANCELADA"] = "Cancelada";
})(EstadoOrden || (exports.EstadoOrden = EstadoOrden = {}));
