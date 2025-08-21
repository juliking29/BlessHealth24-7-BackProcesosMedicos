import { Router } from 'express';
import HistoriaClinicaController from '../../controller/HistoriaClinica/historiaClinica.controller';

const router = Router();

// Obtener todas las historias clínicas
router.get('/historias-clinicas', HistoriaClinicaController.obtenerTodos);

// Obtener historias clínicas por paciente (ID)
router.get('/historias-clinicas/paciente/:idPaciente', HistoriaClinicaController.obtenerPorPaciente);

// Obtener historias clínicas por número de documento del paciente
router.get('/historias-clinicas/documento/:documento', HistoriaClinicaController.obtenerPorDocumentoPaciente);

// Obtener historial completo de un paciente
router.get('/historias-clinicas/historial-completo/:idPaciente', HistoriaClinicaController.obtenerHistorialCompleto);

// Obtener una historia clínica por su ID
router.get('/historias-clinicas/:id', HistoriaClinicaController.obtenerPorId);

// Crear una nueva historia clínica
router.post('/historias-clinicas', HistoriaClinicaController.crear);

// Actualizar una historia clínica
router.put('/historias-clinicas/:id', HistoriaClinicaController.actualizar);

// Eliminar una historia clínica
router.delete('/historias-clinicas/:id', HistoriaClinicaController.eliminar);

export default router;