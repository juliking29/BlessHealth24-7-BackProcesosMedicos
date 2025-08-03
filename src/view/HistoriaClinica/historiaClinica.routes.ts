// routes/HistoriaClinica/historiaClinica.routes.ts

import { Router } from 'express';
import HistoriaClinicaController from '../../controller/HistoriaClinica/historiaClinica.controller';

const router = Router();

// Obtener todas las historias clínicas
router.get('/historias-clinicas', HistoriaClinicaController.obtenerTodos);

// Obtener historias clínicas por paciente
router.get('/historias-clinicas/paciente/:idPaciente', HistoriaClinicaController.obtenerPorPaciente);

// Obtener una historia clínica por su ID
router.get('/historias-clinicas/:id', HistoriaClinicaController.obtenerPorId);

// Crear una nueva historia clínica
router.post('/historias-clinicas', HistoriaClinicaController.crear);

// Actualizar una historia clínica
router.put('/historias-clinicas/:id', HistoriaClinicaController.actualizar);

// Eliminar una historia clínica
router.delete('/historias-clinicas/:id', HistoriaClinicaController.eliminar);
// Obtener historias clínicas por número de documento del paciente
router.get('/historias-clinicas/documento/:documento', HistoriaClinicaController.obtenerPorDocumentoPaciente);

export default router;