"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facturaCita_controller_1 = __importDefault(require("../../controller/FacturaCita/facturaCita.controller"));
const router = (0, express_1.Router)();
// Generar factura desde una cita
router.post('/facturas/generar-desde-cita/:idCita', facturaCita_controller_1.default.generarFactura);
// Obtener facturas por cédula de paciente
router.get('/facturas/por-cedula/:cedula', facturaCita_controller_1.default.obtenerFacturasPorCedula);
// Actualizar cita
router.put('/citas/actualizar/:idCita', facturaCita_controller_1.default.actualizarCita);
// Obtener detalles de una cita
router.get('/citas/detalles/:idCita', facturaCita_controller_1.default.obtenerDetallesCita);
// Eliminar factura (método existente)
router.delete('/facturas/:id/eliminar', facturaCita_controller_1.default.eliminarFactura);
// Eliminar factura por ID usando el procedimiento almacenado (NUEVO ENDPOINT)
router.delete('/facturas/:id', facturaCita_controller_1.default.eliminarFacturaPorId);
// Actualizar factura
router.put('/facturas/:id/actualizar', facturaCita_controller_1.default.actualizarFactura);
exports.default = router;
