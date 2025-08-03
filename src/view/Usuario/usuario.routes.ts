// routes/usuario/usuario.routes.ts
import { Router } from 'express';
import UsuarioController from '../../controller/Usuario/usuario.controller';

const router = Router();

// Ruta para obtener datos auxiliares (tipos de documento, roles, sedes)
// Route to get auxiliary data (document types, roles, locations)
router.get('/usuarios/auxiliares', UsuarioController.obtenerDatosAuxiliares);

// Ruta para obtener todos los usuarios
// Route to get all users
router.get('/usuarios', UsuarioController.obtenerTodos);

// Ruta para obtener usuarios por rol
// Route to get users by role
router.get('/usuarios/rol/:idRol', UsuarioController.obtenerPorRol);

// Ruta para obtener un usuario por email
// Route to get a user by email
router.get('/usuarios/email/:email', UsuarioController.obtenerPorEmail);

// Ruta para obtener un usuario por número de documento
// Route to get a user by document number
router.get('/usuarios/documento/:numeroDocumento', UsuarioController.obtenerPorDocumento);

// Ruta para obtener un usuario por su ID
// Route to get a user by ID
router.get('/usuarios/:id', UsuarioController.obtenerPorId);

// Ruta para crear un nuevo usuario
// Route to create a new user
router.post('/usuarios', UsuarioController.crear);

// Ruta para actualizar un usuario por su ID
// Route to update a user by ID
router.put('/usuarios/:documento', UsuarioController.actualizar);

// Ruta para eliminar (desactivar) un usuario por su ID
// Route to delete (deactivate) a user by ID
router.delete('/usuarios/:documento', UsuarioController.eliminar);

// Ruta para eliminar físicamente un usuario por su ID
// Route to physically delete a user by ID
router.delete('/usuarios/fisico/:documento', UsuarioController.eliminarFisicamente);

export default router;