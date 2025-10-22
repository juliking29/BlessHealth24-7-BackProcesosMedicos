import { Router } from 'express';
import FacturaCitaController from '../../controller/FacturaCita/facturaCita.controller';

const router = Router();

// Generar factura desde una cita
router.post('/facturas/generar-desde-cita/:idCita', FacturaCitaController.generarFactura);

// Obtener facturas por cédula de paciente
router.get('/facturas/por-cedula/:cedula', FacturaCitaController.obtenerFacturasPorCedula);

// Actualizar cita
router.put('/citas/actualizar/:idCita', FacturaCitaController.actualizarCita);

// Obtener detalles de una cita
router.get('/citas/detalles/:idCita', FacturaCitaController.obtenerDetallesCita);

// Eliminar factura (método existente)
router.delete('/facturas/:id/eliminar', FacturaCitaController.eliminarFactura);

// Eliminar factura por ID usando el procedimiento almacenado (NUEVO ENDPOINT)
router.delete('/facturas/:id', FacturaCitaController.eliminarFacturaPorId);

// Actualizar factura
router.put('/facturas/:id/actualizar', FacturaCitaController.actualizarFactura);

export default router;