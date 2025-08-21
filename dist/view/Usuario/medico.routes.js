"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medico_controller_1 = __importDefault(require("../../controller/Usuario/medico.controller"));
const router = (0, express_1.Router)();
router.get('/medicos/especialidades', medico_controller_1.default.obtenerEspecialidades);
router.get('/medicos', medico_controller_1.default.obtenerTodos);
router.get('/medicos/especialidad/:idEspecialidad', medico_controller_1.default.obtenerPorEspecialidad);
router.get('/medicos/sede/:idSede', medico_controller_1.default.obtenerPorSede);
router.get('/medicos/nombre/:nombre', medico_controller_1.default.buscarPorNombre);
router.get('/medicos/documento/:numeroDocumento', medico_controller_1.default.obtenerPorDocumento);
router.get('/medicos/registro/:registroMedico', medico_controller_1.default.obtenerPorRegistroMedico);
router.get('/medicos/:id', medico_controller_1.default.obtenerPorId);
router.post('/medicos', medico_controller_1.default.crear);
router.put('/medicos/:id', medico_controller_1.default.actualizar);
router.delete('/medicos/:id', medico_controller_1.default.eliminar);
router.delete('/medicos/fisico/:id', medico_controller_1.default.eliminarFisicamente);
exports.default = router;
//# sourceMappingURL=medico.routes.js.map