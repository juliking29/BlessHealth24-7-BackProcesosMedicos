// controller/Emergencias/emergencia.controller.ts
import { Request, Response } from 'express';
import EmergenciaModel from '../../Model/Emergencias/emergencia.model';
import Emergencia from '../../interfaces/Emergencias/emergencia.interface';

export default class EmergenciaController {

  public static async obtenerTodos(req: Request, res: Response): Promise<void> {
    try {
      const {
        estado,
        idSede,
        idTipoEmergencia,
        fechaDesde,
        fechaHasta,
        limit,
        offset
      } = req.query;

      const filtros: any = {
        estado: estado as string | undefined,
        idSede: idSede ? Number(idSede) : undefined,
        idTipoEmergencia: idTipoEmergencia ? Number(idTipoEmergencia) : undefined,
        fechaDesde: fechaDesde as string | undefined,
        fechaHasta: fechaHasta as string | undefined,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined
      };

      const [rows, total] = await EmergenciaModel.obtenerFiltrado(filtros);
      res.json({ success: true, data: rows, total });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener emergencias', error: error instanceof Error ? error.message : error });
    }
  }

  public static async obtenerPorId(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params['id']);
      if (isNaN(id)) { res.status(400).json({ success: false, message: 'ID inválido' }); return; }
      const emergencia = await EmergenciaModel.obtenerPorId(id);
      if (!emergencia) { res.status(404).json({ success: false, message: 'Emergencia no encontrada' }); return; }
      res.json({ success: true, data: emergencia });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener emergencia', error: error instanceof Error ? error.message : error });
    }
  }

  public static async crear(req: Request, res: Response): Promise<void> {
    try {
      const body: Emergencia = req.body;
      if (!body.idSede || !body.idTipoEmergencia || !body.fechaHoraLlegada || !body.motivo) {
        res.status(400).json({ success: false, message: 'Faltan datos obligatorios: idSede, idTipoEmergencia, fechaHoraLlegada, motivo' });
        return;
      }
      const idEmergencia = await EmergenciaModel.crear(body);
      res.status(201).json({ success: true, data: { idEmergencia }, message: 'Emergencia creada correctamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear emergencia', error: error instanceof Error ? error.message : error });
    }
  }

  public static async actualizar(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params['id']);
      if (isNaN(id)) { res.status(400).json({ success: false, message: 'ID inválido' }); return; }
      const body: Partial<Emergencia> = req.body;
      await EmergenciaModel.actualizar(id, body);
      res.json({ success: true, message: 'Emergencia actualizada correctamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar emergencia', error: error instanceof Error ? error.message : error });
    }
  }

  public static async eliminar(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params['id']);
      if (isNaN(id)) { res.status(400).json({ success: false, message: 'ID inválido' }); return; }
      await EmergenciaModel.eliminar(id);
      res.json({ success: true, message: 'Emergencia eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar emergencia', error: error instanceof Error ? error.message : error });
    }
  }

  public static async obtenerPorSede(req: Request, res: Response): Promise<void> {
    try {
      const idSede = Number(req.params['idSede']);
      if (isNaN(idSede)) { res.status(400).json({ success: false, message: 'idSede inválido' }); return; }
      const rows = await EmergenciaModel.obtenerPorSede(idSede);
      res.json({ success: true, data: rows });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al buscar por sede', error: error instanceof Error ? error.message : error });
    }
  }

  public static async obtenerPorTipo(req: Request, res: Response): Promise<void> {
    try {
      const idTipo = Number(req.params['idTipo']);
      if (isNaN(idTipo)) { res.status(400).json({ success: false, message: 'idTipo inválido' }); return; }
      const rows = await EmergenciaModel.obtenerPorTipo(idTipo);
      res.json({ success: true, data: rows });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al buscar por tipo', error: error instanceof Error ? error.message : error });
    }
  }

  public static async estadisticasPorEstado(_req: Request, res: Response): Promise<void> {
    try {
      const stats = await EmergenciaModel.contarPorEstado();
      res.json({ success: true, data: stats });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener estadísticas', error: error instanceof Error ? error.message : error });
    }
  }

  public static async asignarMedico(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params['id']);
      const { idMedico } = req.body;
      if (isNaN(id) || typeof idMedico !== 'number') { res.status(400).json({ success: false, message: 'ID inválido o idMedico no proporcionado' }); return; }
      await EmergenciaModel.asignarMedico(id, idMedico);
      res.json({ success: true, message: 'Médico asignado correctamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al asignar médico', error: error instanceof Error ? error.message : error });
    }
  }

  public static async asignarPaciente(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params['id']);
      const { idPaciente } = req.body;
      if (isNaN(id) || typeof idPaciente !== 'number') { res.status(400).json({ success: false, message: 'ID inválido o idPaciente no proporcionado' }); return; }
      await EmergenciaModel.asignarPaciente(id, idPaciente);
      res.json({ success: true, message: 'Paciente asignado correctamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al asignar paciente', error: error instanceof Error ? error.message : error });
    }
  }

  public static async marcarAtencion(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params['id']);
      const { fechaHoraAtencion } = req.body;
      if (isNaN(id)) { res.status(400).json({ success: false, message: 'ID inválido' }); return; }
      const fecha = fechaHoraAtencion ? String(fechaHoraAtencion) : new Date().toISOString().slice(0, 19).replace('T', ' ');
      await EmergenciaModel.marcarAtencion(id, fecha);
      res.json({ success: true, message: 'Atención marcada correctamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al marcar atención', error: error instanceof Error ? error.message : error });
    }
  }
}
