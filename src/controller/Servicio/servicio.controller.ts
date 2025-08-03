import { Request, Response } from 'express';
import ServicioModel from '../../Model/Servicio/servicio.model';


export default class ServicioController {
    // Obtener servicios por especialidad (texto)
    public static async obtenerPorEspecialidadTexto(req: Request, res: Response): Promise<void> {
        try {
            const { idEspecialidad } = req.params;
            
            if (!idEspecialidad || isNaN(parseInt(idEspecialidad))) {
                res.status(400).json({ 
                    success: false,
                    message: 'El ID de especialidad es requerido y debe ser un número válido' 
                });
                return;
            }

            const resultado = await ServicioModel.obtenerServiciosPorEspecialidadTexto(parseInt(idEspecialidad));
            
            res.json({
                success: true,
                data: resultado,
                message: 'Servicios obtenidos correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error al obtener servicios',
                error: error instanceof Error ? error.message : error
            });
        }
    }

    // Obtener todos los servicios (texto)
    public static async obtenerTodosServiciosTexto(_req: Request, res: Response): Promise<void> {
        try {
            const resultado = await ServicioModel.obtenerTodosServiciosTexto();
            
            res.json({
                success: true,
                data: resultado,
                message: 'Servicios obtenidos correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error al obtener servicios',
                error: error instanceof Error ? error.message : error
            });
        }
    }

    // Obtener servicios por especialidad (estructurado)
    public static async obtenerPorEspecialidad(req: Request, res: Response): Promise<void> {
        try {
            const { idEspecialidad } = req.params;
            
            if (!idEspecialidad || isNaN(parseInt(idEspecialidad))) {
                res.status(400).json({ 
                    success: false,
                    message: 'El ID de especialidad es requerido y debe ser un número válido' 
                });
                return;
            }

            const servicios = await ServicioModel.obtenerServiciosPorEspecialidad(parseInt(idEspecialidad));
            
            res.json({
                success: true,
                data: servicios,
                message: 'Servicios obtenidos correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error al obtener servicios',
                error: error instanceof Error ? error.message : error
            });
        }
    }
}