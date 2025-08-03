// interfaces/HistoriaClinica/historiaClinica.interface.ts

export default interface HistoriaClinica {
    idHistoriaClinica?: number;
    idPaciente: number;
    tipoSangre?: string | null;
    alergias?: string | null;
    enfermedadesCronicas?: string | null;
    medicamentos?: string | null;
    antecedentesFamiliares?: string | null;
    observaciones?: string | null;
    fechaCreacion?: Date;
    fechaUltimaActualizacion?: Date | null;
}