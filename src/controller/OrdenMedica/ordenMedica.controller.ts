// controller/OrdenMedica/ordenMedica.controller.ts

import { Request, Response } from 'express';

import { OrdenMedica } from '../../interfaces/OrdenMedica/ordenMedica.interface';
import OrdenMedicaModel from '../../Model/OrdenMedica/ordenMedica.model';

export default class OrdenMedicaController {

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

        const ordenes = await OrdenMedicaModel.obtenerPorCedulaPaciente(numeroDocumento);
        res.json({
            success: true,
            data: ordenes,
            message: 'Órdenes médicas obtenidas correctamente'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            mensaje: 'Error al obtener las órdenes médicas', 
            error: error instanceof Error ? error.message : error 
        });
    }
}


    // Crear una nueva orden médica
    public static async crear(req: Request, res: Response): Promise<void> {
        try {
            const ordenMedica: OrdenMedica = req.body;

            if (!ordenMedica.idRegistroConsulta || !ordenMedica.tipoOrden || !ordenMedica.descripcion) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'Los campos idRegistroConsulta, tipoOrden y descripcion son requeridos' 
                });
                return;
            }

            const idOrdenMedica = await OrdenMedicaModel.crear(ordenMedica);
            res.status(201).json({ 
                success: true,
                data: { idOrdenMedica },
                mensaje: 'Orden médica creada correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al crear la orden médica', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener todas las órdenes médicas
    public static async obtenerTodas(_req: Request, res: Response): Promise<void> {
        try {
            const ordenes = await OrdenMedicaModel.obtenerTodas();
            res.json({
                success: true,
                data: ordenes,
                message: 'Órdenes médicas obtenidas correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener las órdenes médicas', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener órdenes por paciente
    public static async obtenerPorPaciente(req: Request, res: Response): Promise<void> {
        try {
            const { idPaciente } = req.params;

            if (!idPaciente) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'El ID del paciente es requerido' 
                });
                return;
            }

            const ordenes = await OrdenMedicaModel.obtenerPorPaciente(Number(idPaciente));
            res.json({
                success: true,
                data: ordenes,
                message: 'Órdenes médicas obtenidas correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener las órdenes médicas del paciente', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener una orden por ID
    public static async obtenerPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const orden = await OrdenMedicaModel.obtenerPorId(Number(id));

            if (!orden) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Orden médica no encontrada' 
                });
                return;
            }

            res.json({
                success: true,
                data: orden,
                message: 'Orden médica obtenida correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener la orden médica', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Actualizar una orden médica
    public static async actualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const ordenMedica: Partial<OrdenMedica> = req.body;

            const ordenExistente = await OrdenMedicaModel.obtenerPorId(Number(id));
            if (!ordenExistente) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Orden médica no encontrada' 
                });
                return;
            }

            await OrdenMedicaModel.actualizar(Number(id), ordenMedica);
            const ordenActualizada = await OrdenMedicaModel.obtenerPorId(Number(id));
            
            res.json({ 
                success: true,
                data: ordenActualizada,
                mensaje: 'Orden médica actualizada correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al actualizar la orden médica', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Eliminar una orden médica
    public static async eliminar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const ordenExistente = await OrdenMedicaModel.obtenerPorId(Number(id));
            if (!ordenExistente) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Orden médica no encontrada' 
                });
                return;
            }

            await OrdenMedicaModel.eliminar(Number(id));
            res.json({ 
                success: true,
                mensaje: 'Orden médica eliminada correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al eliminar la orden médica', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }
}