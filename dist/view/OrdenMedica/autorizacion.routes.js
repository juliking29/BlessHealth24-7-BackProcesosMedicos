"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autorizacion_controller_1 = __importDefault(require("../../controller/OrdenMedica/autorizacion.controller"));
const router = (0, express_1.Router)();
router.post('/autorizaciones', autorizacion_controller_1.default.crear);
router.get('/autorizaciones', autorizacion_controller_1.default.obtenerTodas);
router.get('/autorizaciones/orden/:idOrdenMedica', autorizacion_controller_1.default.obtenerPorOrdenMedica);
router.get('/autorizaciones/:id', autorizacion_controller_1.default.obtenerPorId);
router.put('/autorizaciones/:id', autorizacion_controller_1.default.actualizar);
router.delete('/autorizaciones/:id', autorizacion_controller_1.default.eliminar);
router.get('/autorizaciones/cedula/:numeroDocumento', autorizacion_controller_1.default.obtenerPorCedulaPaciente);
router.get('/autorizaciones/doctor/cedula/:numeroDocumento', autorizacion_controller_1.default.obtenerPorCedulaDoctor);
exports.default = router;
//# sourceMappingURL=autorizacion.routes.js.map