// controller/medico/medico.controller.ts
import { Request, Response } from 'express';
import MedicoModel from '../../Model/Uusario/medico.model';
import Medico from '../../interfaces/Usuario/medico.interface';

export default class MedicoController {

        // Método para obtener todos los médicos
        // Method to get all doctors
        public static async obtenerTodos(_req: Request, res: Response): Promise<void> {
            try {
            const medicos = await MedicoModel.obtenerTodos();
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

        // Método para obtener médicos por especialidad
        // Method to get doctors by specialty
        public static async obtenerPorEspecialidad(req: Request, res: Response): Promise<void> {
            try {
            const { idEspecialidad } = req.params;

            if (!idEspecialidad) {
                res.status(400).json({ 
                success: false,
                mensaje: 'El ID de la especialidad es requerido' 
                });
                return;
            }

            const medicos = await MedicoModel.obtenerPorEspecialidad(Number(idEspecialidad));
            res.json({
                success: true,
                data: medicos,
                message: 'Médicos obtenidos correctamente'
            });
            } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener médicos por especialidad', 
                error: error instanceof Error ? error.message : error 
            });
            }
        }

        // Método para obtener médicos por sede
        // Method to get doctors by location
        public static async obtenerPorSede(req: Request, res: Response): Promise<void> {
            try {
            const { idSede } = req.params;

            if (!idSede) {
                res.status(400).json({ 
                success: false,
                mensaje: 'El ID de la sede es requerido' 
                });
                return;
            }

            const medicos = await MedicoModel.obtenerPorSede(Number(idSede));
            res.json({
                success: true,
                data: medicos,
                message: 'Médicos obtenidos correctamente'
            });
            } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener médicos por sede', 
                error: error instanceof Error ? error.message : error 
            });
            }
        }

        // Método para obtener un médico por su ID
        // Method to get a doctor by ID
        public static async obtenerPorId(req: Request, res: Response): Promise<void> {
            try {
            const { id } = req.params;
            const medico = await MedicoModel.obtenerPorId(Number(id));

            if (!medico) {
                res.status(404).json({ 
                success: false,
                mensaje: 'Médico no encontrado' 
                });
                return;
            }

            res.json({
                success: true,
                data: medico,
                message: 'Médico obtenido correctamente'
            });
            } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener el médico', 
                error: error instanceof Error ? error.message : error 
            });
            }
        }

        // Método para obtener un médico por número de documento
        // Method to get a doctor by document number
        public static async obtenerPorDocumento(req: Request, res: Response): Promise<void> {
            try {
            const { numeroDocumento } = req.params;

            if (!numeroDocumento) {
                res.status(400).json({ 
                success: false,
                mensaje: 'El número de documento es requerido' 
                });
                return;
            }

            const medico = await MedicoModel.obtenerPorDocumento(numeroDocumento);

            if (!medico) {
                res.status(404).json({ 
                success: false,
                mensaje: 'Médico no encontrado' 
                });
                return;
            }

            res.json({
                success: true,
                data: medico,
                message: 'Médico obtenido correctamente'
            });
            } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener el médico por documento', 
                error: error instanceof Error ? error.message : error 
            });
            }
        }

        // Método para obtener un médico por registro médico
        // Method to get a doctor by medical license
        public static async obtenerPorRegistroMedico(req: Request, res: Response): Promise<void> {
            try {
            const { registroMedico } = req.params;

            if (!registroMedico) {
                res.status(400).json({ 
                success: false,
                mensaje: 'El registro médico es requerido' 
                });
                return;
            }

            const medico = await MedicoModel.obtenerPorRegistroMedico(registroMedico);

            if (!medico) {
                res.status(404).json({ 
                success: false,
                mensaje: 'Médico no encontrado' 
                });
                return;
            }

            res.json({
                success: true,
                data: medico,
                message: 'Médico obtenido correctamente'
            });
            } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al obtener el médico por registro médico', 
                error: error instanceof Error ? error.message : error 
            });
            }
        }

        // Método para buscar médicos por nombre
        // Method to search doctors by name
        public static async buscarPorNombre(req: Request, res: Response): Promise<void> {
            try {
            const { nombre } = req.params;

            if (!nombre) {
                res.status(400).json({ 
                success: false,
                mensaje: 'El nombre es requerido' 
                });
                return;
            }

            const medicos = await MedicoModel.buscarPorNombre(nombre);
            res.json({
                success: true,
                data: medicos,
                message: 'Médicos encontrados correctamente'
            });
            } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al buscar médicos por nombre', 
                error: error instanceof Error ? error.message : error 
            });
            }
        }

        // Método para crear un nuevo médico
        // Method to create a new doctor
        public static async crear(req: Request, res: Response): Promise<void> {
            try {
            const medico: Omit<Medico, 'nombreUsuario' | 'apellidoUsuario' | 'emailUsuario' | 'telefonoUsuario' | 'numeroDocumento' | 'especialidadNombre' | 'sedeNombre'> = req.body;

            // Validaciones básicas
            if (!medico.idMedico || !medico.idEspecialidad || !medico.registroMedico || 
                !medico.universidad || !medico.anioGraduacion) {
                res.status(400).json({ 
                success: false,
                mensaje: 'Faltan campos obligatorios' 
                });
                return;
            }

            // Verificar si ya existe un médico con el mismo registro médico
            const medicoExistente = await MedicoModel.obtenerPorRegistroMedico(medico.registroMedico);
            if (medicoExistente) {
                res.status(409).json({ 
                success: false,
                mensaje: 'Ya existe un médico con ese registro médico' 
                });
                return;
            }

            await MedicoModel.crear(medico);
            res.status(201).json({ 
                success: true,
                mensaje: 'Médico creado correctamente' 
            });
            } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al crear el médico', 
                error: error instanceof Error ? error.message : error 
            });
            }
        }

        // Método para actualizar un médico por su ID
        // Method to update a doctor by ID
        public static async actualizar(req: Request, res: Response): Promise<void> {
            try {
            const { id } = req.params;
            const medico: Partial<Omit<Medico, 'idMedico' | 'nombreUsuario' | 'apellidoUsuario' | 'emailUsuario' | 'telefonoUsuario' | 'numeroDocumento' | 'especialidadNombre' | 'sedeNombre'>> = req.body;

            // Verificar que el médico existe
            const medicoExistente = await MedicoModel.obtenerPorId(Number(id));
            if (!medicoExistente) {
                res.status(404).json({ 
                success: false,
                mensaje: 'Médico no encontrado' 
                });
                return;
            }

            // Si se está actualizando el registro médico, verificar que no exista otro médico con ese registro
            if (medico.registroMedico && medico.registroMedico !== medicoExistente.registroMedico) {
                const medicoConMismoRegistro = await MedicoModel.obtenerPorRegistroMedico(medico.registroMedico);
                if (medicoConMismoRegistro && medicoConMismoRegistro.idMedico !== Number(id)) {
                res.status(409).json({ 
                    success: false,
                    mensaje: 'Ya existe otro médico con ese registro médico' 
                });
                return;
                }
            }

            await MedicoModel.actualizar(Number(id), medico);
            res.json({ 
                success: true,
                mensaje: 'Médico actualizado correctamente' 
            });
            } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al actualizar el médico', 
                error: error instanceof Error ? error.message : error 
            });
            }
        }

        // Método para eliminar (desactivar) un médico por su ID
        // Method to delete (deactivate) a doctor by ID
        public static async eliminar(req: Request, res: Response): Promise<void> {
            try {
            const { id } = req.params;

            // Verificar que el médico existe
            const medicoExistente = await MedicoModel.obtenerPorId(Number(id));
            if (!medicoExistente) {
                res.status(404).json({ 
                success: false,
                mensaje: 'Médico no encontrado' 
                });
                return;
            }

            await MedicoModel.eliminar(Number(id));
            res.json({ 
                success: true,
                mensaje: 'Médico eliminado correctamente' 
            });
            } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al eliminar el médico', 
                error: error instanceof Error ? error.message : error 
            });
            }
        }

        // Método para eliminar físicamente un médico por su ID
        // Method to physically delete a doctor by ID
        public static async eliminarFisicamente(req: Request, res: Response): Promise<void> {
            try {
            const { id } = req.params;

            // Verificar que el médico existe
            const medicoExistente = await MedicoModel.obtenerPorId(Number(id));
            if (!medicoExistente) {
                res.status(404).json({ 
                success: false,
                mensaje: 'Médico no encontrado' 
                });
                return;
            }

            await MedicoModel.eliminarFisicamente(Number(id));
            res.json({ 
                success: true,
                mensaje: 'Médico eliminado físicamente' 
            });
            } catch (error) {
            res.status(500).json({ 
                success: false,
                mensaje: 'Error al eliminar físicamente el médico', 
                error: error instanceof Error ? error.message : error 
            });
            }
        }

        // Método para obtener especialidades
        // Method to get specialties
        public static async obtenerEspecialidades(_req: Request, res: Response): Promise<void> {
            try {
            const especialidades = await MedicoModel.obtenerEspecialidades();
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
}