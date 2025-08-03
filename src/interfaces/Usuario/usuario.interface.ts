// interfaces/usuario.interface.ts
export default interface Usuario {
  idUsuario?: number;
  tipoDocumento: number;
  numeroDocumento: string;
  nombreUsuario: string;
  apellidoUsuario: string;
  emailUsuario: string;
  pwdUsuario?: string; // Opcional para updates sin cambio de contraseña
  telefonoUsuario: string;
  direccionUsuario: string;
  fechaNacimiento?: string;
  genero?: 'M' | 'F' | 'O';
  idRol: number;
  idSede?: number;
  estadoUsuario?: number;
  fechaRegistro?: string;
}
