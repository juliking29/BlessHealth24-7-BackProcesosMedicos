import { Request, Response } from 'express';
import HistoriaClinicaModel from '../../Model/HistoriaClinica/historiaClinica.model';
import HistoriaClinica from '../../interfaces/HistoriaClinica/historiaClinica.interface';

export default class HistoriaClinicaController {

    // Obtener historias clínicas por número de documento del paciente
    public static async obtenerPorDocumentoPaciente(req: Request, res: Response): Promise<void> {
        try {
            const { documento } = req.params;

            if (!documento) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'El número de documento es requerido' 
                });
                return;
            }

            const historias = await HistoriaClinicaModel.obtenerPorDocumentoPaciente(documento);
            
            if (historias.length === 0) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'No se encontraron historias clínicas para este paciente' 
                });
                return;
            }

            res.json({
                success: true,
                data: historias,
                message: 'Historias clínicas obtenidas correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener historias clínicas por documento', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener todas las historias clínicas
    public static async obtenerTodos(_req: Request, res: Response): Promise<void> {
        try {
            const historias = await HistoriaClinicaModel.obtenerTodos();
            res.json({
                success: true,
                data: historias,
                message: 'Historias clínicas obtenidas correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener las historias clínicas', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener historias clínicas por paciente
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

            const historias = await HistoriaClinicaModel.obtenerPorPaciente(Number(idPaciente));
            res.json({
                success: true,
                data: historias,
                message: 'Historias clínicas obtenidas correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener historias clínicas por paciente', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Obtener una historia clínica por su ID
    public static async obtenerPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const historia = await HistoriaClinicaModel.obtenerPorId(Number(id));

            if (!historia) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Historia clínica no encontrada' 
                });
                return;
            }

            res.json({
                success: true,
                data: historia,
                message: 'Historia clínica obtenida correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener la historia clínica', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Crear una nueva historia clínica
    public static async crear(req: Request, res: Response): Promise<void> {
        try {
            const historia: HistoriaClinica = req.body;

            // Validaciones básicas
            if (!historia.idPaciente) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'El ID del paciente es obligatorio' 
                });
                return;
            }

            const idHistoria = await HistoriaClinicaModel.crear(historia);
            
            // Obtener la historia clínica recién creada para devolver todos los datos
            const historiaCreada = await HistoriaClinicaModel.obtenerPorId(idHistoria);
            
            res.status(201).json({ 
                success: true,
                data: historiaCreada,
                mensaje: 'Historia clínica creada correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al crear la historia clínica', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Actualizar una historia clínica
    public static async actualizar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const historia: Partial<HistoriaClinica> = req.body;

            // Verificar que la historia existe
            const historiaExistente = await HistoriaClinicaModel.obtenerPorId(Number(id));
            if (!historiaExistente) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Historia clínica no encontrada' 
                });
                return;
            }

            const historiaActualizada = await HistoriaClinicaModel.actualizar(Number(id), historia);
            
            res.json({ 
                success: true,
                data: historiaActualizada,
                mensaje: 'Historia clínica actualizada correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al actualizar la historia clínica', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Eliminar una historia clínica
    public static async eliminar(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            // Verificar que la historia existe
            const historiaExistente = await HistoriaClinicaModel.obtenerPorId(Number(id));
            if (!historiaExistente) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'Historia clínica no encontrada' 
                });
                return;
            }

            await HistoriaClinicaModel.eliminar(Number(id));
            res.json({ 
                success: true,
                mensaje: 'Historia clínica eliminada correctamente' 
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al eliminar la historia clínica', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }

    // Nuevo método para obtener el historial completo de un paciente
    public static async obtenerHistorialCompleto(req: Request, res: Response): Promise<void> {
        try {
            const { idPaciente } = req.params;

            if (!idPaciente) {
                res.status(400).json({ 
                    success: false,
                    mensaje: 'El ID del paciente es requerido' 
                });
                return;
            }

            const historias = await HistoriaClinicaModel.obtenerPorPaciente(Number(idPaciente));
            
            if (historias.length === 0) {
                res.status(404).json({ 
                    success: false,
                    mensaje: 'No se encontró historial clínico para este paciente' 
                });
                return;
            }

            res.json({
                success: true,
                data: historias,
                message: 'Historial clínico obtenido correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener el historial clínico', 
                error: error instanceof Error ? error.message : error 
            });
        }
    }
}