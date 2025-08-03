// controller/Cita/cita.controller.ts

import { Request, Response } from 'express';
import {  Cita, DisponibilidadHoraRequest, DisponibilidadRangoRequest, HorariosDisponiblesRequest } from '../../interfaces/Citas/cita.interface';
import CitaModel from '../../Model/Citas/cita.model';


export default class CitaController {



     // Disponibilidad por hora específica
    public static async obtenerMedicosDisponiblesPorEspecialidad(req: Request, res: Response): Promise<void> {
        try {
            const filtros: DisponibilidadHoraRequest = req.body;

            if (!filtros.idEspecialidad || !filtros.fecha || !filtros.hora) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'Los campos idEspecialidad, fecha y hora son requeridos' 
                });
                return;
            }

            const medicos = await CitaModel.obtenerMedicosDisponiblesPorEspecialidad(filtros);
            res.json({
                success: true,
                data: medicos,
                message: 'Médicos obtenidos correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener médicos disponibles', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Disponibilidad por rango de fechas
    public static async obtenerMedicosDisponiblesPorSedeEspecialidad(req: Request, res: Response): Promise<void> {
        try {
            const filtros: DisponibilidadRangoRequest = req.body;

            if (!filtros.idSede || !filtros.idEspecialidad || !filtros.fechaInicio || !filtros.fechaFin) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'Los campos idSede, idEspecialidad, fechaInicio y fechaFin son requeridos' 
                });
                return;
            }

            const medicos = await CitaModel.obtenerMedicosDisponiblesPorSedeEspecialidad(filtros);
            res.json({
                success: true,
                data: medicos,
                message: 'Médicos obtenidos correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener médicos disponibles', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Horarios disponibles en un día
    public static async obtenerMedicosConHorariosDisponibles(req: Request, res: Response): Promise<void> {
        try {
            const filtros: HorariosDisponiblesRequest = req.body;

            if (!filtros.idSede || !filtros.idEspecialidad || !filtros.fecha) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'Los campos idSede, idEspecialidad y fecha son requeridos' 
                });
                return;
            }

            const medicos = await CitaModel.obtenerMedicosConHorariosDisponibles(filtros);
            res.json({
                success: true,
                data: medicos,
                message: 'Médicos obtenidos correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener médicos disponibles', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }
    // Obtener todas las citas
    public static async obtenerTodos(_req: Request, res: Response): Promise<void> {
        try {
            const citas = await CitaModel.obtenerTodos();
            res.json({
                success: true,
                data: citas,
                message: 'Citas obtenidas correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener las citas', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

   

    // Obtener una cita por su ID
    public static async obtenerPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const cita = await CitaModel.obtenerPorId(Number(id));

            if (!cita) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Cita no encontrada' 
                });
                return;
            }

            res.json({
                success: true,
                data: cita,
                message: 'Cita obtenida correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener la cita', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Crear una nueva cita
    public static async crear(req: Request, res: Response): Promise<void> {
        try {
            const cita: Cita = req.body;

            // Validaciones básicas
            if (!cita.idPaciente || !cita.idServicio || !cita.idSede || !cita.fechaHora || !cita.motivo) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'Faltan campos obligatorios (idPaciente, idServicio, idSede, fechaHora, motivo)' 
                });
                return;
            }

            const idCita = await CitaModel.crear(cita);
            res.status(201).json({ 
                success: true,
                data: { idCita },
                mensaje: 'Cita creada correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al crear la cita', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Actualizar una cita
    public static async actualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const cita: Partial<Cita> = req.body;

            // Verificar que la cita existe
            const citaExistente = await CitaModel.obtenerPorId(Number(id));
            if (!citaExistente) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Cita no encontrada' 
                });
                return;
            }

            const citaActualizada = await CitaModel.actualizar(Number(id), cita);
            
            res.json({ 
                success: true,
                data: citaActualizada,
                mensaje: 'Cita actualizada correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al actualizar la cita', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Cancelar una cita
    public static async cancelar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { motivoCancelacion } = req.body;

            if (!motivoCancelacion) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'El motivo de cancelación es requerido' 
                });
                return;
            }

            // Verificar que la cita existe
            const citaExistente = await CitaModel.obtenerPorId(Number(id));
            if (!citaExistente) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Cita no encontrada' 
                });
                return;
            }

            await CitaModel.cancelar(Number(id), motivoCancelacion);
            res.json({ 
                success: true,
                mensaje: 'Cita cancelada correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al cancelar la cita', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Eliminar una cita
    public static async eliminar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            // Verificar que la cita existe
            const citaExistente = await CitaModel.obtenerPorId(Number(id));
            if (!citaExistente) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Cita no encontrada' 
                });
                return;
            }

            await CitaModel.eliminar(Number(id));
            res.json({ 
                success: true,
                mensaje: 'Cita eliminada correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al eliminar la cita', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Finalizar una cita
    public static async finalizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            // Verificar que la cita existe
            const citaExistente = await CitaModel.obtenerPorId(Number(id));
            if (!citaExistente) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Cita no encontrada' 
                });
                return;
            }

            const resultado = await CitaModel.finalizar(Number(id));
            
            if (resultado.resultado === 'ERROR') {
                res.status(400).json({ 
                    success: false,
                    mensaje: resultado.mensaje,
                    data: resultado
                });
            } else {
                res.json({ 
                    success: true,
                    data: resultado,
                    mensaje: 'Cita finalizada correctamente' 
                });
            }
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al finalizar la cita', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

   

    // Obtener todos los médicos con sus especialidades
    public static async obtenerTodosMedicosConEspecialidades(_req: Request, res: Response): Promise<void> {
        try {
            const medicos = await CitaModel.obtenerTodosMedicosConEspecialidades();
            res.json({
                success: true,
                data: medicos,
                message: 'Médicos obtenidos correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener los médicos', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

     // Obtener citas por paciente
    public static async obtenerCitasPorPaciente(req: Request, res: Response): Promise<void> {
        try {
            const { idPaciente } = req.params;
            const { estado } = req.query;

            if (!idPaciente) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'El ID del paciente es requerido' 
                });
                return;
            }

            const citas = await CitaModel.obtenerCitasPorPaciente(
                Number(idPaciente),
                estado as string | undefined
            );

            res.json({
                success: true,
                data: citas,
                message: 'Citas del paciente obtenidas correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener las citas del paciente', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener citas por doctor
    public static async obtenerCitasPorDoctor(req: Request, res: Response): Promise<void> {
        try {
            const { idMedico } = req.params;
            const { estado, fechaInicio, fechaFin } = req.query;

            if (!idMedico) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'El ID del médico es requerido' 
                });
                return;
            }

            const citas = await CitaModel.obtenerCitasPorDoctor(
                Number(idMedico),
                estado as string | undefined,
                fechaInicio as string | undefined,
                fechaFin as string | undefined
            );

            res.json({
                success: true,
                data: citas,
                message: 'Citas del doctor obtenidas correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener las citas del doctor', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener todas las sedes
    public static async obtenerSedes(_req: Request, res: Response): Promise<void> {
        try {
            const sedes = await CitaModel.obtenerSedes();
            res.json({
                success: true,
                data: sedes,
                message: 'Sedes obtenidas correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener las sedes', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener todas las especialidades
    public static async obtenerEspecialidades(_req: Request, res: Response): Promise<void> {
        try {
            const especialidades = await CitaModel.obtenerEspecialidades();
            res.json({
                success: true,
                data: especialidades,
                message: 'Especialidades obtenidas correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener las especialidades', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener todos los servicios
    public static async obtenerServicios(_req: Request, res: Response): Promise<void> {
        try {
            const servicios = await CitaModel.obtenerServicios();
            res.json({
                success: true,
                data: servicios,
                message: 'Servicios obtenidos correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener los servicios', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

  // Buscar citas por paciente (con cédula) - POST
public static async buscarCitasPorPaciente(req: Request, res: Response): Promise<void> {
    try {
        const { cedula } = req.params;
        const { fechaInicio, fechaFin } = req.body;

        if (!cedula) {
            res.status(400).json({ 
                success: false,
                mensaje: 'La cédula del paciente es requerida' 
            });
            return;
        }

        const citas = await CitaModel.buscarCitasPorPaciente(
            cedula,
            fechaInicio || null,
            fechaFin || null
        );

        res.json({
            success: true,
            data: citas,
            message: 'Citas del paciente obtenidas correctamente'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            mensaje: 'Error al obtener las citas del paciente', 
            error: error instanceof Error ? error.message : error 
        });
    }
}

// Buscar citas por médico (con cédula) - POST
public static async buscarCitasPorMedico(req: Request, res: Response): Promise<void> {
    try {
        const { cedula } = req.params;
        const { fechaInicio, fechaFin } = req.body;

        if (!cedula) {
            res.status(400).json({ 
                success: false,
                mensaje: 'La cédula del médico es requerida' 
            });
            return;
        }

        const citas = await CitaModel.buscarCitasPorMedico(
            cedula,
            fechaInicio || null,
            fechaFin || null
        );

        res.json({
            success: true,
            data: citas,
            message: 'Citas del médico obtenidas correctamente'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            mensaje: 'Error al obtener las citas del médico', 
            error: error instanceof Error ? error.message : error 
        });
    }
}
}