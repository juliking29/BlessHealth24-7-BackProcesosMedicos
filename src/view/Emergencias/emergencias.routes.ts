import { Router } from 'express';
import EmergenciaController from '../../controller/Emergencias/emergencia.controller';

const router = Router();

router.get('/emergencias', EmergenciaController.obtenerTodos); 
router.get('/emergencias/:id', EmergenciaController.obtenerPorId);
router.post('/emergencias', EmergenciaController.crear);
router.put('/emergencias/:id', EmergenciaController.actualizar);
router.delete('/emergencias/:id', EmergenciaController.eliminar);

router.get('/emergencias/sede/:idSede', EmergenciaController.obtenerPorSede);
router.get('/emergencias/tipo/:idTipo', EmergenciaController.obtenerPorTipo);
router.get('/emergencias/estadisticas/estado', EmergenciaController.estadisticasPorEstado);

router.patch('/emergencias/:id/asignar-medico', EmergenciaController.asignarMedico);
router.patch('/emergencias/:id/asignar-paciente', EmergenciaController.asignarPaciente);
router.patch('/emergencias/:id/marcar-atencion', EmergenciaController.marcarAtencion);

export default router;
