export interface GenerarFacturaCitaParams {
    idCita: number;
}

export interface GenerarFacturaCitaResult {
    success: boolean;
    message: string;
    numeroFactura?: string;
}

export interface FacturaDetallada {
    idFactura: number;
    numeroFactura: string;
    fechaEmision: Date;
    fechaVencimiento: Date;
    concepto: string;
    detalles: string;
    subtotal: number;
    iva: number;
    total: number;
    observaciones: string;
    nombreCompletoPaciente: string;
    emailUsuario: string;
    telefonoUsuario: string;
    direccionUsuario: string;
    nombreTipoDocumento: string;
    numeroDocumento: string;
    idCita?: number;
    fechaHoraCita?: Date;
    estadoCita?: string;
    motivoCita?: string;
    nombreServicio?: string;
    precioServicio?: number;
    nombreCompletoMedico?: string;
    nombreEspecialidad?: string;
    nombreSede?: string;
    direccionSede?: string;
    ciudadSede?: string;
    telefonoSede?: string;
    idEmergencia?: number;
    fechaHoraLlegada?: Date;
    motivoEmergencia?: string;
    nombreTipoEmergencia?: string;
}

export interface ActualizarCitaParams {
    idCita: number;
    idMedico?: number | null;
    fechaHora?: Date | string;
    estadoCita?: string;
    observaciones?: string;
}

export interface DetallesCita {
    idCita: number;
    fechaHora: Date;
    estadoCita: string;
    motivo: string;
    sintomas: string;
    observaciones: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    nombreCompletoPaciente: string;
    emailPaciente: string;
    telefonoPaciente: string;
    cedulaPaciente: string;
    nombreTipoDocumento: string;
    nombreCompletoMedico?: string;
    emailMedico?: string;
    telefonoMedico?: string;
    nombreEspecialidad?: string;
    registroMedico?: string;
    nombreServicio: string;
    descripcionServicio: string;
    precioServicio: number;
    duracionEstimada: number;
    necesitaAutorizacion: boolean;
    nombreSede: string;
    direccionSede: string;
    ciudadSede: string;
    telefonoSede: string;
    numeroFactura?: string;
    totalFactura?: number;
    tieneFactura: string;
}
export interface EliminarFacturaResult {
    status: 'success' | 'error' | 'warning';
    message: string;
    deleted: boolean;
    idFactura: number;
}

export interface ActualizarFacturaParams {
    idFactura: number;
    idCita?: number | null;
    idEmergencia?: number | null;
    concepto?: string;
    detalles?: string;
    fechaVencimiento?: Date | string;
    subtotal?: number;
    observaciones?: string;
}

export interface ActualizarFacturaResult {
    status: 'success' | 'error' | 'warning';
    message: string;
    updated: boolean;
    idFactura: number;
    changes?: {
        concepto?: string;
        subtotal?: number;
        iva?: number;
        total?: number;
        fechaVencimiento?: string;
    };
}
// Interface para el nuevo endpoint de eliminar factura por ID
export interface EliminarFacturaPorIdParams {
    idFactura: number;
}

export interface EliminarFacturaPorIdResult {
    success: boolean;
    message: string;
    facturasEliminadas?: number;
}