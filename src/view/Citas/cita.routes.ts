// routes/Cita/cita.routes.ts

import { Router } from 'express';
import CitaController from '../../controller/Citas/cita.controller';


const router = Router();


// Disponibilidad por hora específica
router.post('/medicos/disponibilidad/hora-especifica', CitaController.obtenerMedicosDisponiblesPorEspecialidad);

// Disponibilidad por rango de fechas
router.post('/medicos/disponibilidad/rango-fechas', CitaController.obtenerMedicosDisponiblesPorSedeEspecialidad);

// Horarios disponibles en un día
router.post('/medicos/disponibilidad/horarios-disponibles', CitaController.obtenerMedicosConHorariosDisponibles);

// Obtener todas las citas
router.get('/citas', CitaController.obtenerTodos);


// Obtener una cita por su ID
router.get('/citas/:id', CitaController.obtenerPorId);

// Crear una nueva cita
router.post('/citas', CitaController.crear);

// Actualizar una cita
router.put('/citas/:id', CitaController.actualizar);

// Cancelar una cita
router.put('/citas/:id/cancelar', CitaController.cancelar);

// Finalizar una cita
router.put('/citas/:id/finalizar', CitaController.finalizar);

// Eliminar una cita
router.delete('/citas/:id', CitaController.eliminar);

// Obtener todos los médicos con sus especialidades
router.get('/medicos', CitaController.obtenerTodosMedicosConEspecialidades);


router.get('/citas/paciente/:idPaciente', CitaController.obtenerCitasPorPaciente);

// Obtener citas por doctor
router.get('/citas/doctor/:idMedico', CitaController.obtenerCitasPorDoctor);

// Obtener todas las sedes
router.get('/sedes', CitaController.obtenerSedes);

// Obtener todas las especialidades
router.get('/especialidades', CitaController.obtenerEspecialidades);

// Obtener todos los servicios
router.get('/servicios', CitaController.obtenerServicios);

// Buscar citas por paciente (con cédula) - POST
router.post('/citas/buscar/paciente/:cedula', CitaController.buscarCitasPorPaciente);

// Buscar citas por médico (con cédula) - POST
router.post('/citas/buscar/medico/:cedula', CitaController.buscarCitasPorMedico);
export default router;