

// interfaces/medico.interface.ts
export default interface Medico {
  idMedico: number; 
  idEspecialidad: number;
  registroMedico: string;
  universidad: string;
  anioGraduacion: number;
  estadoMedico?: number;

  nombreUsuario?: string;
  apellidoUsuario?: string;
  emailUsuario?: string;
  telefonoUsuario?: string;
  numeroDocumento?: string;
  especialidadNombre?: string;
  sedeNombre?: string;
}