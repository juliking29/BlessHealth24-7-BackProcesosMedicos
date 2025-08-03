// routes/OrdenMedica/ordenMedica.routes.ts

import { Router } from 'express';
import OrdenMedicaController from '../../controller/OrdenMedica/ordenMedica.controller';

const router = Router();

// Crear una nueva orden médica
router.post('/ordenes-medicas', OrdenMedicaController.crear);

// Obtener todas las órdenes médicas
router.get('/ordenes-medicas', OrdenMedicaController.obtenerTodas);

// Obtener órdenes por paciente
router.get('/ordenes-medicas/paciente/:idPaciente', OrdenMedicaController.obtenerPorPaciente);

// Obtener una orden por ID
router.get('/ordenes-medicas/:id', OrdenMedicaController.obtenerPorId);

// Actualizar una orden médica
router.put('/ordenes-medicas/:id', OrdenMedicaController.actualizar);

// Eliminar una orden médica
router.delete('/ordenes-medicas/:id', OrdenMedicaController.eliminar);

router.get('/ordenes-medicas/cedula/:numeroDocumento', OrdenMedicaController.obtenerPorCedulaPaciente);


export default router;