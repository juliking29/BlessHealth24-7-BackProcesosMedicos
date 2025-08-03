// interfaces/RegistroConsulta/registroConsulta.interface.ts

export interface RegistroConsulta {
    idRegistroConsulta?: number;
    idHistoriaClinica: number;
    idMedico: number;
    idCita?: number | null;
    fechaConsulta: Date | string;
    motivoConsulta: string;
    sintomas?: string | null;
    diagnostico?: string | null;
    tratamiento?: string | null;
    observaciones?: string | null;
    presionArterial?: string | null;
    frecuenciaCardiaca?: string | null;
    temperatura?: string | null;
    peso?: number | null;
    altura?: number | null;
}

export interface RegistroConsultaCompleto extends RegistroConsulta {
    nombrePaciente?: string;
    nombreMedico?: string;
    especialidadMedico?: string;
    numeroDocumentoPaciente?: string;
    numeroDocumentoMedico?: string;
    estadoCita?: string;
}