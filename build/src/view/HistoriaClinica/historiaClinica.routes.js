"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historiaClinica_controller_1 = __importDefault(require("../../controller/HistoriaClinica/historiaClinica.controller"));
const router = (0, express_1.Router)();
// Obtener todas las historias clínicas
router.get('/historias-clinicas', historiaClinica_controller_1.default.obtenerTodos);
// Obtener historias clínicas por paciente (ID)
router.get('/historias-clinicas/paciente/:idPaciente', historiaClinica_controller_1.default.obtenerPorPaciente);
// Obtener historias clínicas por número de documento del paciente
router.get('/historias-clinicas/documento/:documento', historiaClinica_controller_1.default.obtenerPorDocumentoPaciente);
// Obtener historial completo de un paciente
router.get('/historias-clinicas/historial-completo/:idPaciente', historiaClinica_controller_1.default.obtenerHistorialCompleto);
// Obtener una historia clínica por su ID
router.get('/historias-clinicas/:id', historiaClinica_controller_1.default.obtenerPorId);
// Crear una nueva historia clínica
router.post('/historias-clinicas', historiaClinica_controller_1.default.crear);
// Actualizar una historia clínica
router.put('/historias-clinicas/:id', historiaClinica_controller_1.default.actualizar);
// Eliminar una historia clínica
router.delete('/historias-clinicas/:id', historiaClinica_controller_1.default.eliminar);
exports.default = router;
