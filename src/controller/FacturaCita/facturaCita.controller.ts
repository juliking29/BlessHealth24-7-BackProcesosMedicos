import { Request, Response } from 'express';
import FacturaCitaModel from '../../Model/FacturaCita/facturaCita.model';
import { ActualizarCitaParams, ActualizarFacturaParams } from '../../interfaces/FacturaCita/facturaCita.interface';



export default class FacturaCitaController {
    // Generar factura desde una cita
    public static async generarFactura(req: Request, res: Response): Promise<void> {
        try {
            const { idCita } = req.params;
            
            if (!idCita) {
                res.status(400).json({ 
                    success: false,
                    message: 'El ID de la cita es requerido' 
                });
                return;
            }

            const result = await FacturaCitaModel.generarFacturaCita({ idCita: parseInt(idCita) });
            
            if (!result.success) {
                res.status(400).json({
                    success: false,
                    message: result.message
                });
                return;
            }

            res.json({
                success: true,
                message: result.message,
                numeroFactura: result.numeroFactura
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error al generar factura',
                error: error instanceof Error ? error.message : error
            });
        }
    }

    // Obtener facturas por cédula de paciente
    public static async obtenerFacturasPorCedula(req: Request, res: Response): Promise<void> {
        try {
            const { cedula } = req.params;
            
            if (!cedula) {
                res.status(400).json({ 
                    success: false,
                    message: 'La cédula del paciente es requerida' 
                });
                return;
            }

            const facturas = await FacturaCitaModel.obtenerFacturasPorCedula(cedula);
            
            res.json({
                success: true,
                data: facturas,
                message: 'Facturas obtenidas correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error al obtener facturas',
                error: error instanceof Error ? error.message : error
            });
        }
    }

   public static async actualizarCita(req: Request, res: Response): Promise<void> {
    try {
        const { idCita } = req.params;
        
        // Validar que idCita existe y es un número válido
        if (!idCita || isNaN(parseInt(idCita))) {
            res.status(400).json({ 
                success: false,
                message: 'El ID de la cita es requerido y debe ser un número válido' 
            });
            return;
        }

        const params: ActualizarCitaParams = {
            idCita: parseInt(idCita),
            ...req.body
        };

        const mensaje = await FacturaCitaModel.actualizarCita(params);
        
        res.json({
            success: true,
            message: mensaje
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error al actualizar cita',
            error: error instanceof Error ? error.message : error
        });
    }
}
    // Obtener detalles de una cita
    public static async obtenerDetallesCita(req: Request, res: Response): Promise<void> {
        try {
            const { idCita } = req.params;
            
            if (!idCita) {
                res.status(400).json({ 
                    success: false,
                    message: 'El ID de la cita es requerido' 
                });
                return;
            }

            const detalles = await FacturaCitaModel.obtenerDetallesCita(parseInt(idCita));
            
            res.json({
                success: true,
                data: detalles,
                message: 'Detalles de cita obtenidos correctamente'
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error al obtener detalles de cita',
                error: error instanceof Error ? error.message : error
            });
        }
    }

   // Añadir estos nuevos métodos a la clase FacturaController

// Eliminar factura
public static async eliminarFactura(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        
        if (!id || isNaN(parseInt(id))) {
            res.status(400).json({ 
                success: false,
                message: 'El ID de la factura es requerido y debe ser un número válido' 
            });
            return;
        }

        const resultado = await FacturaCitaModel.eliminarFactura(parseInt(id));
        
        if (resultado.status === 'error') {
            res.status(404).json({
                success: false,
                ...resultado
            });
            return;
        }

        res.json({
            success: true,
            ...resultado
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error al eliminar factura',
            error: error instanceof Error ? error.message : error
        });
    }
}
public static async actualizarFactura(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        
        // Validar que el ID existe y es un número válido
        if (!id || isNaN(parseInt(id))) {
            res.status(400).json({ 
                success: false,
                message: 'El ID de la factura es requerido y debe ser un número válido' 
            });
            return;
        }

        const params: ActualizarFacturaParams = {
            idFactura: parseInt(id),
            ...req.body
        };

        const resultado = await FacturaCitaModel.actualizarFactura(params);
        
        if (resultado.status === 'error') {
            res.status(404).json({
                success: false,
                ...resultado
            });
            return;
        }

        res.json({
            success: resultado.status === 'success',
            ...resultado
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error al actualizar factura',
            error: error instanceof Error ? error.message : error
        });
    }
}

    

}