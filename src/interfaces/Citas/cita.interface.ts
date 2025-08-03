// interfaces/Cita/cita.interface.ts

export interface Cita {
    idCita?: number;
    idPaciente: number;
    idMedico: number | null;
    idServicio: number;
    idSede: number;
    fechaHora: Date | string;
    estadoCita: 'Pendiente' | 'Confirmada' | 'Cancelada' | 'En progreso' | 'Completada';
    motivo: string;
    sintomas?: string;
    observaciones?: string;
    fechaCreacion?: Date;
    fechaActualizacion?: Date | null;
}

export interface CitaCompleta extends Cita {
    nombrePaciente?: string;
    nombreMedico?: string;
    nombreServicio?: string;
    nombreEspecialidad?: string;
    nombreSede?: string;
}

export interface DisponibilidadMedico {
    idMedico: number;
    nombreCompleto: string;
    nombreEspecialidad: string;
    registroMedico: string;
    sedeAsignada: string;
    horariosDisponibles?: string;
    citasProgramadas?: number;
}


// interfaces/Cita/cita.interface.ts

export interface DisponibilidadHoraRequest {
    idEspecialidad: number;
    idSede: number;
    fecha: string;
    hora: string; 
}

export interface DisponibilidadRangoRequest {
    idEspecialidad: number;
    idSede: number;
    fechaInicio: string;
    fechaFin: string;
}

export interface HorariosDisponiblesRequest {
    idEspecialidad: number;
    idSede: number;
    fecha: string; 
}


export interface Sede {
    idSede: number;
    nombreSede: string;
    direccionSede: string;
    ciudadSede: string;
    telefonoSede: string;
    estadoSede: number;
    fechaApertura: Date | string;
}

export interface Especialidad {
    idEspecialidad: number;
    nombreEspecialidad: string;
    descripcion?: string;
    estadoEspecialidad: number;
}

export interface Servicio {
    idServicio: number;
    nombreServicio: string;
    descripcionServicio?: string;
    precioServicio: number;
    idEspecialidad: number;
    necesitaAutorizacion: number;
    estadoServicio: number;
    duracionEstimada?: number;
}