"use strict";
// routes/OrdenMedica/ordenMedica.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ordenMedica_controller_1 = __importDefault(require("../../controller/OrdenMedica/ordenMedica.controller"));
const router = (0, express_1.Router)();
// Crear una nueva orden médica
router.post('/ordenes-medicas', ordenMedica_controller_1.default.crear);
// Obtener todas las órdenes médicas
router.get('/ordenes-medicas', ordenMedica_controller_1.default.obtenerTodas);
// Obtener órdenes por paciente
router.get('/ordenes-medicas/paciente/:idPaciente', ordenMedica_controller_1.default.obtenerPorPaciente);
// Obtener una orden por ID
router.get('/ordenes-medicas/:id', ordenMedica_controller_1.default.obtenerPorId);
// Actualizar una orden médica
router.put('/ordenes-medicas/:id', ordenMedica_controller_1.default.actualizar);
// Eliminar una orden médica
router.delete('/ordenes-medicas/:id', ordenMedica_controller_1.default.eliminar);
router.get('/ordenes-medicas/cedula/:numeroDocumento', ordenMedica_controller_1.default.obtenerPorCedulaPaciente);
exports.default = router;
