"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registroConsulta_controller_1 = __importDefault(require("../../controller/RegistroConsulta/registroConsulta.controller"));
const router = (0, express_1.Router)();
router.post('/registros-consultas', registroConsulta_controller_1.default.crear);
router.get('/registros-consultas', registroConsulta_controller_1.default.obtenerTodos);
router.get('/registros-consultas/paciente/:numeroDocumento', registroConsulta_controller_1.default.obtenerPorCedulaPaciente);
router.get('/registros-consultas/cita/:idCita', registroConsulta_controller_1.default.obtenerPorIdCita);
router.get('/registros-consultas/:id', registroConsulta_controller_1.default.obtenerPorId);
router.put('/registros-consultas/:id', registroConsulta_controller_1.default.actualizar);
router.delete('/registros-consultas/:id', registroConsulta_controller_1.default.eliminar);
exports.default = router;
//# sourceMappingURL=registroConsulta.routes.js.map