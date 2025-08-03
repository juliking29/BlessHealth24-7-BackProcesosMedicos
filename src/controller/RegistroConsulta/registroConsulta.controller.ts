// controller/RegistroConsulta/registroConsulta.controller.ts

import { Request, Response } from 'express';
import { RegistroConsulta } from '../../interfaces/RegistroConsulta/registroConsulta.interface';
import RegistroConsultaModel from '../../Model/RegistroConsulta/registroConsulta.model';

export default class RegistroConsultaController {
    // Crear un nuevo registro de consulta
    public static async crear(req: Request, res: Response): Promise<void> {
        try {
            const registro: RegistroConsulta = req.body;

            // Validaciones básicas
            if (!registro.idHistoriaClinica || !registro.idMedico || !registro.fechaConsulta || !registro.motivoConsulta) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'Los campos idHistoriaClinica, idMedico, fechaConsulta y motivoConsulta son requeridos' 
                });
                return;
            }

            const idRegistro = await RegistroConsultaModel.crear(registro);
            res.status(201).json({ 
                success: true,
                data: { idRegistroConsulta: idRegistro },
                mensaje: 'Registro de consulta creado correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al crear el registro de consulta', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener todos los registros
    public static async obtenerTodos(_req: Request, res: Response): Promise<void> {
        try {
            const registros = await RegistroConsultaModel.obtenerTodos();
            res.json({
                success: true,
                data: registros,
                message: 'Registros de consulta obtenidos correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener los registros de consulta', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener registros por cédula del paciente
    public static async obtenerPorCedulaPaciente(req: Request, res: Response): Promise<void> {
        try {
            const { numeroDocumento } = req.params;

            if (!numeroDocumento) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'El número de documento del paciente es requerido' 
                });
                return;
            }

            const registros = await RegistroConsultaModel.obtenerPorCedulaPaciente(numeroDocumento);
            res.json({
                success: true,
                data: registros,
                message: 'Registros de consulta obtenidos correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener los registros de consulta', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener registros por ID de cita
    public static async obtenerPorIdCita(req: Request, res: Response): Promise<void> {
        try {
            const { idCita } = req.params;

            if (!idCita) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'El ID de la cita es requerido' 
                });
                return;
            }

            const registros = await RegistroConsultaModel.obtenerPorIdCita(Number(idCita));
            res.json({
                success: true,
                data: registros,
                message: 'Registros de consulta obtenidos correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener los registros de consulta', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener un registro por ID
    public static async obtenerPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const registro = await RegistroConsultaModel.obtenerPorId(Number(id));

            if (!registro) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Registro de consulta no encontrado' 
                });
                return;
            }

            res.json({
                success: true,
                data: registro,
                message: 'Registro de consulta obtenido correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener el registro de consulta', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Actualizar un registro
    public static async actualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const registro: Partial<RegistroConsulta> = req.body;

            const registroExistente = await RegistroConsultaModel.obtenerPorId(Number(id));
            if (!registroExistente) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Registro de consulta no encontrado' 
                });
                return;
            }

            await RegistroConsultaModel.actualizar(Number(id), registro);
            const registroActualizado = await RegistroConsultaModel.obtenerPorId(Number(id));
            
            res.json({ 
                success: true,
                data: registroActualizado,
                mensaje: 'Registro de consulta actualizado correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al actualizar el registro de consulta', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Eliminar un registro
    public static async eliminar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const registroExistente = await RegistroConsultaModel.obtenerPorId(Number(id));
            if (!registroExistente) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Registro de consulta no encontrado' 
                });
                return;
            }

            await RegistroConsultaModel.eliminar(Number(id));
            res.json({ 
                success: true,
                mensaje: 'Registro de consulta eliminado correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al eliminar el registro de consulta', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }
}