// interfaces/OrdenMedica/ordenMedica.interface.ts

export enum TipoOrden {
    PROCEDIMIENTO = 'Procedimiento',
    EXAMEN = 'Examen',
    MEDICAMENTO = 'Medicamento',
    TERAPIA = 'Terapia',
    INTERCONSULTA = 'Interconsulta'
}

export enum EstadoOrden {
    PENDIENTE = 'Pendiente',
    COMPLETADA = 'Completada',
    CANCELADA = 'Cancelada'
}

export interface OrdenMedica {
    idOrdenMedica?: number;
    idRegistroConsulta: number;
    tipoOrden: TipoOrden;
    descripcion: string;
    fechaEmision?: Date | string;
    fechaVencimiento?: Date | string | null;
    estadoOrden?: EstadoOrden;
    observaciones?: string | null;
}

export interface OrdenMedicaCompleta extends OrdenMedica {
    nombrePaciente?: string;
    nombreMedico?: string;
    especialidad?: string;
}

export interface Autorizacion {
    idAutorizacion?: number;
    idOrdenMedica: number;
    idAutorizador: number;
    fechaAutorizacion?: Date | string;
    estadoAutorizacion: 'Pendiente' | 'Aprobada' | 'Rechazada';
    observaciones?: string | null;
}

export interface AutorizacionCompleta extends Autorizacion {
    nombreAutorizador?: string;
    nombrePaciente?: string;
    tipoOrden?: TipoOrden;
    descripcionOrden?: string;
}
// interfaces/OrdenMedica/ordenMedica.interface.ts

export interface FiltroOrdenes {
    idPaciente?: number;
    numeroDocumento?: string;
    estadoOrden?: EstadoOrden;
    tipoOrden?: TipoOrden;
    fechaInicio?: string;
    fechaFin?: string;
}

export interface FiltroAutorizaciones {
    idPaciente?: number;
    numeroDocumento?: string;
    estadoAutorizacion?: 'Pendiente' | 'Aprobada' | 'Rechazada';
    fechaInicio?: string;
    fechaFin?: string;
}