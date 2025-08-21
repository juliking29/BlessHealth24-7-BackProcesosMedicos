"use strict";
// routes/Autorizacion/autorizacion.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autorizacion_controller_1 = __importDefault(require("../../controller/OrdenMedica/autorizacion.controller"));
const router = (0, express_1.Router)();
// Crear una nueva autorización
router.post('/autorizaciones', autorizacion_controller_1.default.crear);
// Obtener todas las autorizaciones
router.get('/autorizaciones', autorizacion_controller_1.default.obtenerTodas);
// Obtener autorizaciones por orden médica
router.get('/autorizaciones/orden/:idOrdenMedica', autorizacion_controller_1.default.obtenerPorOrdenMedica);
// Obtener una autorización por ID
router.get('/autorizaciones/:id', autorizacion_controller_1.default.obtenerPorId);
// Actualizar una autorización
router.put('/autorizaciones/:id', autorizacion_controller_1.default.actualizar);
// Eliminar una autorización
router.delete('/autorizaciones/:id', autorizacion_controller_1.default.eliminar);
// Obtener autorizaciones por cédula de paciente
router.get('/autorizaciones/cedula/:numeroDocumento', autorizacion_controller_1.default.obtenerPorCedulaPaciente);
router.get('/autorizaciones/doctor/cedula/:numeroDocumento', autorizacion_controller_1.default.obtenerPorCedulaDoctor);
exports.default = router;
