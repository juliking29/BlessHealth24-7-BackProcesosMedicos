"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ordenMedica_controller_1 = __importDefault(require("../../controller/OrdenMedica/ordenMedica.controller"));
const router = (0, express_1.Router)();
router.post('/ordenes-medicas', ordenMedica_controller_1.default.crear);
router.get('/ordenes-medicas', ordenMedica_controller_1.default.obtenerTodas);
router.get('/ordenes-medicas/paciente/:idPaciente', ordenMedica_controller_1.default.obtenerPorPaciente);
router.get('/ordenes-medicas/:id', ordenMedica_controller_1.default.obtenerPorId);
router.put('/ordenes-medicas/:id', ordenMedica_controller_1.default.actualizar);
router.delete('/ordenes-medicas/:id', ordenMedica_controller_1.default.eliminar);
router.get('/ordenes-medicas/cedula/:numeroDocumento', ordenMedica_controller_1.default.obtenerPorCedulaPaciente);
exports.default = router;
//# sourceMappingURL=ordenMedica.routes.js.map