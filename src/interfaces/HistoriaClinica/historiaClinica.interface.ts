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
    
   
    actividadFisica?: string | null;
    alimentacionDiaria?: string | null;
    suenio?: string | null;
    sexualidad?: string | null;
    viajes?: string | null;
    alcohol?: string | null;
    sustanciasPsicoactivas?: string | null;
    antecedentesPersonales?: string | null;
    diagnosticosPrincipales?: string | null;
    diagnosticosDiferenciales?: string | null;
    planManejo?: string | null;
    conductaTratamiento?: string | null;
    remisiones?: string | null;
    examenesSolicitados?: string | null;
    educacionPaciente?: string | null;
    epicrisis?: string | null;
    

    nombreUsuario?: string;
    apellidoUsuario?: string;
    numeroDocumento?: string;
}