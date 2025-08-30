export type EstadoEmergencia = 'Ingresada' | 'En atención' | 'Estable' | 'Crítica' | 'Alta' | 'Fallecido';

export default interface Emergencia {
  idEmergencia?: number;
  idSede: number;
  idTipoEmergencia: number;
  idPaciente?: number | null;
  idMedico?: number | null;
  fechaHoraLlegada: string;
  fechaHoraAtencion?: string | null;
  fechaHoraAlta?: string | null;
  motivo: string;
  sintomas?: string | null;
  diagnostico?: string | null;
  tratamiento?: string | null;
  observaciones?: string | null;
  estadoEmergencia?: EstadoEmergencia;
}
