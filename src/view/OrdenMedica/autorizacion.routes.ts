// routes/Autorizacion/autorizacion.routes.ts

import { Router } from 'express';
import AutorizacionController from '../../controller/OrdenMedica/autorizacion.controller';

const router = Router();

// Crear una nueva autorización
router.post('/autorizaciones', AutorizacionController.crear);

// Obtener todas las autorizaciones
router.get('/autorizaciones', AutorizacionController.obtenerTodas);

// Obtener autorizaciones por orden médica
router.get('/autorizaciones/orden/:idOrdenMedica', AutorizacionController.obtenerPorOrdenMedica);

// Obtener una autorización por ID
router.get('/autorizaciones/:id', AutorizacionController.obtenerPorId);

// Actualizar una autorización
router.put('/autorizaciones/:id', AutorizacionController.actualizar);

// Eliminar una autorización
router.delete('/autorizaciones/:id', AutorizacionController.eliminar);

// Obtener autorizaciones por cédula de paciente
router.get('/autorizaciones/cedula/:numeroDocumento', AutorizacionController.obtenerPorCedulaPaciente);

router.get('/autorizaciones/doctor/cedula/:numeroDocumento', AutorizacionController.obtenerPorCedulaDoctor);

export default router;