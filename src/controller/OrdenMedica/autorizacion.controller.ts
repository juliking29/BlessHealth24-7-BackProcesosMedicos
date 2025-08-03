// controller/Autorizacion/autorizacion.controller.ts

import { Request, Response } from 'express';
import AutorizacionModel from '../../Model/OrdenMedica/autorizacion.model';
import { Autorizacion } from '../../interfaces/OrdenMedica/ordenMedica.interface';

export default class AutorizacionController {
    // Crear una nueva autorización
    public static async crear(req: Request, res: Response): Promise<void> {
        try {
            const autorizacion: Autorizacion = req.body;

            if (!autorizacion.idOrdenMedica || !autorizacion.idAutorizador || !autorizacion.estadoAutorizacion) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'Los campos idOrdenMedica, idAutorizador y estadoAutorizacion son requeridos' 
                });
                return;
            }

            const idAutorizacion = await AutorizacionModel.crear(autorizacion);
            res.status(201).json({ 
                success: true,
                data: { idAutorizacion },
                mensaje: 'Autorización creada correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al crear la autorización', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener todas las autorizaciones
    public static async obtenerTodas(_req: Request, res: Response): Promise<void> {
        try {
            const autorizaciones = await AutorizacionModel.obtenerTodas();
            res.json({
                success: true,
                data: autorizaciones,
                message: 'Autorizaciones obtenidas correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener las autorizaciones', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener autorizaciones por orden médica
    public static async obtenerPorOrdenMedica(req: Request, res: Response): Promise<void> {
        try {
            const { idOrdenMedica } = req.params;

            if (!idOrdenMedica) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'El ID de la orden médica es requerido' 
                });
                return;
            }

            const autorizaciones = await AutorizacionModel.obtenerPorOrdenMedica(Number(idOrdenMedica));
            res.json({
                success: true,
                data: autorizaciones,
                message: 'Autorizaciones obtenidas correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener las autorizaciones', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener una autorización por ID
    public static async obtenerPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const autorizacion = await AutorizacionModel.obtenerPorId(Number(id));

            if (!autorizacion) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Autorización no encontrada' 
                });
                return;
            }

            res.json({
                success: true,
                data: autorizacion,
                message: 'Autorización obtenida correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener la autorización', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Actualizar una autorización
    public static async actualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const autorizacion: Partial<Autorizacion> = req.body;

            const autorizacionExistente = await AutorizacionModel.obtenerPorId(Number(id));
            if (!autorizacionExistente) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Autorización no encontrada' 
                });
                return;
            }

            await AutorizacionModel.actualizar(Number(id), autorizacion);
            const autorizacionActualizada = await AutorizacionModel.obtenerPorId(Number(id));
            
            res.json({ 
                success: true,
                data: autorizacionActualizada,
                mensaje: 'Autorización actualizada correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al actualizar la autorización', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Eliminar una autorización
    public static async eliminar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const autorizacionExistente = await AutorizacionModel.obtenerPorId(Number(id));
            if (!autorizacionExistente) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Autorización no encontrada' 
                });
                return;
            }

            await AutorizacionModel.eliminar(Number(id));
            res.json({ 
                success: true,
                mensaje: 'Autorización eliminada correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al eliminar la autorización', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }
    
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

        const autorizaciones = await AutorizacionModel.obtenerPorCedulaPaciente(numeroDocumento);
        res.json({
            success: true,
            data: autorizaciones,
            message: 'Autorizaciones obtenidas correctamente'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            mensaje: 'Error al obtener las autorizaciones', 
            error: error instanceof Error ? error.message : error 
        });
    }

}
public static async obtenerPorCedulaDoctor(req: Request, res: Response): Promise<void> {
    try {
        const { numeroDocumento } = req.params;

        if (!numeroDocumento) {
            res.status(400).json({ 
                success: false,
                mensaje: 'El número de documento del doctor es requerido' 
            });
            return;
        }

        const autorizaciones = await AutorizacionModel.obtenerPorCedulaDoctor(numeroDocumento);
        res.json({
            success: true,
            data: autorizaciones,
            message: 'Autorizaciones obtenidas correctamente'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            mensaje: 'Error al obtener las autorizaciones', 
            error: error instanceof Error ? error.message : error 
        });
    }
}
}