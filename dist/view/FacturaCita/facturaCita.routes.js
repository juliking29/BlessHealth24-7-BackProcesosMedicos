"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facturaCita_controller_1 = __importDefault(require("../../controller/FacturaCita/facturaCita.controller"));
const router = (0, express_1.Router)();
router.post('/facturas/generar-desde-cita/:idCita', facturaCita_controller_1.default.generarFactura);
router.get('/facturas/por-cedula/:cedula', facturaCita_controller_1.default.obtenerFacturasPorCedula);
router.put('/citas/actualizar/:idCita', facturaCita_controller_1.default.actualizarCita);
router.get('/citas/detalles/:idCita', facturaCita_controller_1.default.obtenerDetallesCita);
router.delete('/facturas/:id/eliminar', facturaCita_controller_1.default.eliminarFactura);
router.put('/facturas/:id/actualizar', facturaCita_controller_1.default.actualizarFactura);
exports.default = router;
//# sourceMappingURL=facturaCita.routes.js.map