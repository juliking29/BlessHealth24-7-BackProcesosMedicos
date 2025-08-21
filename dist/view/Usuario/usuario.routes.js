"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = __importDefault(require("../../controller/Usuario/usuario.controller"));
const router = (0, express_1.Router)();
router.get('/usuarios/auxiliares', usuario_controller_1.default.obtenerDatosAuxiliares);
router.get('/usuarios', usuario_controller_1.default.obtenerTodos);
router.get('/usuarios/rol/:idRol', usuario_controller_1.default.obtenerPorRol);
router.get('/usuarios/email/:email', usuario_controller_1.default.obtenerPorEmail);
router.get('/usuarios/documento/:numeroDocumento', usuario_controller_1.default.obtenerPorDocumento);
router.get('/usuarios/:id', usuario_controller_1.default.obtenerPorId);
router.post('/usuarios', usuario_controller_1.default.crear);
router.put('/usuarios/:documento', usuario_controller_1.default.actualizar);
router.delete('/usuarios/:documento', usuario_controller_1.default.eliminar);
router.delete('/usuarios/fisico/:documento', usuario_controller_1.default.eliminarFisicamente);
exports.default = router;
//# sourceMappingURL=usuario.routes.js.map