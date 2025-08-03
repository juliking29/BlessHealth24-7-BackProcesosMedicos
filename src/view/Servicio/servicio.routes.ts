import { Router } from 'express';
import ServicioController from '../../controller/Servicio/servicio.controller';

const router = Router();

// Obtener servicios por especialidad (texto)
router.get('/servicios/especialidad-texto/:idEspecialidad', ServicioController.obtenerPorEspecialidadTexto);

// Obtener todos los servicios (texto)
router.get('/servicios/todos-texto', ServicioController.obtenerTodosServiciosTexto);

// Obtener servicios por especialidad (estructurado)
router.get('/servicios/especialidad/:idEspecialidad', ServicioController.obtenerPorEspecialidad);

export default router;