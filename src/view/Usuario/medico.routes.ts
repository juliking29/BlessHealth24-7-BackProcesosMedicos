// routes/medico/medico.routes.ts
import { Router } from 'express';
import MedicoController from '../../controller/Usuario/medico.controller';

const router = Router();

// Ruta para obtener especialidades
// Route to get specialties
router.get('/medicos/especialidades', MedicoController.obtenerEspecialidades);

// Ruta para obtener todos los médicos
// Route to get all doctors
router.get('/medicos', MedicoController.obtenerTodos);

// Ruta para obtener médicos por especialidad
// Route to get doctors by specialty
router.get('/medicos/especialidad/:idEspecialidad', MedicoController.obtenerPorEspecialidad);

// Ruta para obtener médicos por sede
// Route to get doctors by location
router.get('/medicos/sede/:idSede', MedicoController.obtenerPorSede);

// Ruta para buscar médicos por nombre
// Route to search doctors by name
router.get('/medicos/nombre/:nombre', MedicoController.buscarPorNombre);

// Ruta para obtener un médico por número de documento
// Route to get a doctor by document number
router.get('/medicos/documento/:numeroDocumento', MedicoController.obtenerPorDocumento);

// Ruta para obtener un médico por registro médico
// Route to get a doctor by medical license
router.get('/medicos/registro/:registroMedico', MedicoController.obtenerPorRegistroMedico);

// Ruta para obtener un médico por su ID
// Route to get a doctor by ID
router.get('/medicos/:id', MedicoController.obtenerPorId);

// Ruta para crear un nuevo médico
// Route to create a new doctor
router.post('/medicos', MedicoController.crear);

// Ruta para actualizar un médico por su ID
// Route to update a doctor by ID
router.put('/medicos/:id', MedicoController.actualizar);

// Ruta para eliminar (desactivar) un médico por su ID
// Route to delete (deactivate) a doctor by ID
router.delete('/medicos/:id', MedicoController.eliminar);

// Ruta para eliminar físicamente un médico por su ID
// Route to physically delete a doctor by ID
router.delete('/medicos/fisico/:id', MedicoController.eliminarFisicamente);

export default router;