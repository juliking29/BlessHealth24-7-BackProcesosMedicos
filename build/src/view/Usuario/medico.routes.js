"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/medico/medico.routes.ts
const express_1 = require("express");
const medico_controller_1 = __importDefault(require("../../controller/Usuario/medico.controller"));
const router = (0, express_1.Router)();
// Ruta para obtener especialidades
// Route to get specialties
router.get('/medicos/especialidades', medico_controller_1.default.obtenerEspecialidades);
// Ruta para obtener todos los médicos
// Route to get all doctors
router.get('/medicos', medico_controller_1.default.obtenerTodos);
// Ruta para obtener médicos por especialidad
// Route to get doctors by specialty
router.get('/medicos/especialidad/:idEspecialidad', medico_controller_1.default.obtenerPorEspecialidad);
// Ruta para obtener médicos por sede
// Route to get doctors by location
router.get('/medicos/sede/:idSede', medico_controller_1.default.obtenerPorSede);
// Ruta para buscar médicos por nombre
// Route to search doctors by name
router.get('/medicos/nombre/:nombre', medico_controller_1.default.buscarPorNombre);
// Ruta para obtener un médico por número de documento
// Route to get a doctor by document number
router.get('/medicos/documento/:numeroDocumento', medico_controller_1.default.obtenerPorDocumento);
// Ruta para obtener un médico por registro médico
// Route to get a doctor by medical license
router.get('/medicos/registro/:registroMedico', medico_controller_1.default.obtenerPorRegistroMedico);
// Ruta para obtener un médico por su ID
// Route to get a doctor by ID
router.get('/medicos/:id', medico_controller_1.default.obtenerPorId);
// Ruta para crear un nuevo médico
// Route to create a new doctor
router.post('/medicos', medico_controller_1.default.crear);
// Ruta para actualizar un médico por su ID
// Route to update a doctor by ID
router.put('/medicos/:id', medico_controller_1.default.actualizar);
// Ruta para eliminar (desactivar) un médico por su ID
// Route to delete (deactivate) a doctor by ID
router.delete('/medicos/:id', medico_controller_1.default.eliminar);
// Ruta para eliminar físicamente un médico por su ID
// Route to physically delete a doctor by ID
router.delete('/medicos/fisico/:id', medico_controller_1.default.eliminarFisicamente);
exports.default = router;
