"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/usuario/usuario.routes.ts
const express_1 = require("express");
const usuario_controller_1 = __importDefault(require("../../controller/Usuario/usuario.controller"));
const router = (0, express_1.Router)();
// Ruta para obtener datos auxiliares (tipos de documento, roles, sedes)
// Route to get auxiliary data (document types, roles, locations)
router.get('/usuarios/auxiliares', usuario_controller_1.default.obtenerDatosAuxiliares);
// Ruta para obtener todos los usuarios
// Route to get all users
router.get('/usuarios', usuario_controller_1.default.obtenerTodos);
// Ruta para obtener usuarios por rol
// Route to get users by role
router.get('/usuarios/rol/:idRol', usuario_controller_1.default.obtenerPorRol);
// Ruta para obtener un usuario por email
// Route to get a user by email
router.get('/usuarios/email/:email', usuario_controller_1.default.obtenerPorEmail);
// Ruta para obtener un usuario por número de documento
// Route to get a user by document number
router.get('/usuarios/documento/:numeroDocumento', usuario_controller_1.default.obtenerPorDocumento);
// Ruta para obtener un usuario por su ID
// Route to get a user by ID
router.get('/usuarios/:id', usuario_controller_1.default.obtenerPorId);
// Ruta para crear un nuevo usuario
// Route to create a new user
router.post('/usuarios', usuario_controller_1.default.crear);
// Ruta para actualizar un usuario por su ID
// Route to update a user by ID
router.put('/usuarios/:documento', usuario_controller_1.default.actualizar);
// Ruta para eliminar (desactivar) un usuario por su ID
// Route to delete (deactivate) a user by ID
router.delete('/usuarios/:documento', usuario_controller_1.default.eliminar);
// Ruta para eliminar físicamente un usuario por su ID
// Route to physically delete a user by ID
router.delete('/usuarios/fisico/:documento', usuario_controller_1.default.eliminarFisicamente);
exports.default = router;
