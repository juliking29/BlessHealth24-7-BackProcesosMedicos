"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historiaClinica_controller_1 = __importDefault(require("../../controller/HistoriaClinica/historiaClinica.controller"));
const router = (0, express_1.Router)();
router.get('/historias-clinicas', historiaClinica_controller_1.default.obtenerTodos);
router.get('/historias-clinicas/paciente/:idPaciente', historiaClinica_controller_1.default.obtenerPorPaciente);
router.get('/historias-clinicas/documento/:documento', historiaClinica_controller_1.default.obtenerPorDocumentoPaciente);
router.get('/historias-clinicas/historial-completo/:idPaciente', historiaClinica_controller_1.default.obtenerHistorialCompleto);
router.get('/historias-clinicas/:id', historiaClinica_controller_1.default.obtenerPorId);
router.post('/historias-clinicas', historiaClinica_controller_1.default.crear);
router.put('/historias-clinicas/:id', historiaClinica_controller_1.default.actualizar);
router.delete('/historias-clinicas/:id', historiaClinica_controller_1.default.eliminar);
exports.default = router;
//# sourceMappingURL=historiaClinica.routes.js.map