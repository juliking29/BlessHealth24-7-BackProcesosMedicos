// routes/RegistroConsulta/registroConsulta.routes.ts

import { Router } from 'express';
import RegistroConsultaController from '../../controller/RegistroConsulta/registroConsulta.controller';

const router = Router();

// Crear un nuevo registro
router.post('/registros-consultas', RegistroConsultaController.crear);

// Obtener todos los registros
router.get('/registros-consultas', RegistroConsultaController.obtenerTodos);

// Obtener registros por cédula del paciente
router.get('/registros-consultas/paciente/:numeroDocumento', RegistroConsultaController.obtenerPorCedulaPaciente);

// Obtener registros por ID de cita
router.get('/registros-consultas/cita/:idCita', RegistroConsultaController.obtenerPorIdCita);

// Obtener un registro por ID
router.get('/registros-consultas/:id', RegistroConsultaController.obtenerPorId);

// Actualizar un registro
router.put('/registros-consultas/:id', RegistroConsultaController.actualizar);

// Eliminar un registro
router.delete('/registros-consultas/:id', RegistroConsultaController.eliminar);

export default router;