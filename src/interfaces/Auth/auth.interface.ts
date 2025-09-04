// interfaces/Auth/auth.interface.ts
export interface LoginData {
  emailUsuario: string;
  pwdUsuario: string;
}

export interface RegisterData {
  tipoDocumento: number;
  numeroDocumento: string;
  nombreUsuario: string;
  apellidoUsuario: string;
  emailUsuario: string;
  pwdUsuario: string;
  telefonoUsuario: string;
  direccionUsuario: string;
  fechaNacimiento?: string;
  genero?: string;
  idRol: number;
  idSede?: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    refreshToken: string;
    usuario: any;
  };
}

export interface TokenPayload {
  idUsuario: number;
  emailUsuario: string;
  idRol: number;
  nombreUsuario: string;
  apellidoUsuario: string;
}