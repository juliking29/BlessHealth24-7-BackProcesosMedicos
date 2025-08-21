"use strict";
// routes/RegistroConsulta/registroConsulta.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registroConsulta_controller_1 = __importDefault(require("../../controller/RegistroConsulta/registroConsulta.controller"));
const router = (0, express_1.Router)();
// Crear un nuevo registro
router.post('/registros-consultas', registroConsulta_controller_1.default.crear);
// Obtener todos los registros
router.get('/registros-consultas', registroConsulta_controller_1.default.obtenerTodos);
// Obtener registros por cédula del paciente
router.get('/registros-consultas/paciente/:numeroDocumento', registroConsulta_controller_1.default.obtenerPorCedulaPaciente);
// Obtener registros por ID de cita
router.get('/registros-consultas/cita/:idCita', registroConsulta_controller_1.default.obtenerPorIdCita);
// Obtener un registro por ID
router.get('/registros-consultas/:id', registroConsulta_controller_1.default.obtenerPorId);
// Actualizar un registro
router.put('/registros-consultas/:id', registroConsulta_controller_1.default.actualizar);
// Eliminar un registro
router.delete('/registros-consultas/:id', registroConsulta_controller_1.default.eliminar);
exports.default = router;
