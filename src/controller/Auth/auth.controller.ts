// Controller/Auth/
import { Request, Response } from 'express';
import AuthModel from '../../Model/Auth/auth.model';
import { LoginData, RegisterData, TokenPayload } from '../../interfaces/Auth/auth.interface';

export default class AuthController {
  
  // Método para login
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const loginData: LoginData = req.body;
      
      // Validaciones básicas
      if (!loginData.emailUsuario || !loginData.pwdUsuario) {
        res.status(400).json({
          success: false,
          message: 'Email y contraseña son requeridos'
        });
        return;
      }
      
      // Autenticar usuario
      const usuario = await AuthModel.login(loginData);
      
      // Preparar payload para el token
      const tokenPayload: TokenPayload = {
        idUsuario: usuario.idUsuario,
        emailUsuario: usuario.emailUsuario,
        idRol: usuario.idRol,
        nombreUsuario: usuario.nombreUsuario,
        apellidoUsuario: usuario.apellidoUsuario
      };
      
      // Generar tokens
      const token = AuthModel.generarToken(tokenPayload);
      const refreshToken = AuthModel.generarRefreshToken(tokenPayload);
      
      // Eliminar información sensible antes de enviar
      const { pwdUsuario, ...usuarioSinPassword } = usuario;
      
      res.json({
        success: true,
        message: 'Login exitoso',
        data: {
          token,
          refreshToken,
          usuario: usuarioSinPassword
        }
      });
      
    } catch (error) {
      console.error('Error en login:', error);
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error en el login'
      });
    }
  }
  
  // Método para registro
  public static async register(req: Request, res: Response): Promise<void> {
    try {
      const registerData: RegisterData = req.body;
      
      // Validaciones básicas
      const camposRequeridos = [
        'numeroDocumento', 'nombreUsuario', 'apellidoUsuario', 
        'emailUsuario', 'pwdUsuario', 'telefonoUsuario', 
        'direccionUsuario', 'idRol', 'tipoDocumento'
      ];
      
      const camposFaltantes = camposRequeridos.filter(campo => !registerData[campo as keyof RegisterData]);
      
      if (camposFaltantes.length > 0) {
        res.status(400).json({
          success: false,
          message: `Faltan campos obligatorios: ${camposFaltantes.join(', ')}`
        });
        return;
      }
      
      // Validar fortaleza de contraseña
      if (registerData.pwdUsuario.length < 6) {
        res.status(400).json({
          success: false,
          message: 'La contraseña debe tener al menos 6 caracteres'
        });
        return;
      }
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registerData.emailUsuario)) {
        res.status(400).json({
          success: false,
          message: 'El formato del email no es válido'
        });
        return;
      }
      
      // Registrar usuario
      const idUsuario = await AuthModel.register(registerData);
      
      res.status(201).json({
        success: true,
        message: 'Usuario registrado correctamente',
        data: { idUsuario }
      });
      
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error en el registro'
      });
    }
  }
  
  // Método para refrescar token
  public static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        res.status(400).json({
          success: false,
          message: 'Refresh token es requerido'
        });
        return;
      }
      
      // Verificar refresh token
      const decoded = AuthModel.verificarToken(refreshToken);
      
      // Asegurar que decoded es un objeto (no string)
      if (typeof decoded === 'string') {
        res.status(401).json({
          success: false,
          message: 'Refresh token inválido'
        });
        return;
      }
      
      // Generar nuevo token
      const newToken = AuthModel.generarToken({
        idUsuario: decoded.idUsuario,
        emailUsuario: decoded.emailUsuario,
        idRol: decoded.idRol,
        nombreUsuario: decoded.nombreUsuario,
        apellidoUsuario: decoded.apellidoUsuario
      });
      
      res.json({
        success: true,
        message: 'Token refrescado exitosamente',
        data: {
          token: newToken
        }
      });
      
    } catch (error) {
      console.error('Error al refrescar token:', error);
      res.status(401).json({
        success: false,
        message: 'Refresh token inválido o expirado'
      });
    }
  }
  
  // Método para verificar token
  public static async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
          success: false,
          message: 'Token no proporcionado'
        });
        return;
      }
      
      const token = authHeader.substring(7);
      const decoded = AuthModel.verificarToken(token);
      
      res.json({
        success: true,
        message: 'Token válido',
        data: {
          valid: true,
          user: decoded
        }
      });
      
    } catch (error) {
      console.error('Error al verificar token:', error);
      res.status(401).json({
        success: false,
        message: 'Token inválido o expirado',
        data: {
          valid: false
        }
      });
    }
  }
  
  // Método para obtener perfil de usuario (protegido)
  public static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      // Este método requiere el middleware de autenticación
      // El usuario se obtiene del request a través del middleware
      const user = (req as any).user;
      
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado'
        });
        return;
      }
      
      // Obtener información completa del usuario desde la base de datos
      const usuarioCompleto = await AuthModel.obtenerPorId(user.idUsuario);
      
      if (!usuarioCompleto) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
        return;
      }
      
      // Eliminar información sensible
      const { pwdUsuario, ...usuarioSinPassword } = usuarioCompleto;
      
      res.json({
        success: true,
        message: 'Perfil obtenido exitosamente',
        data: {
          usuario: usuarioSinPassword
        }
      });
      
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el perfil'
      });
    }
  }

  // Controller/Auth/auth.controller.ts (añade este método)
public static async obtenerUsuarioPorToken(req: Request, res: Response): Promise<void> {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Token de acceso requerido'
      });
      return;
    }
    
    const token = authHeader.substring(7);
    
    // Obtener usuario usando el token
    const usuario = await AuthModel.obtenerUsuarioPorToken(token);
    
    if (!usuario) {
      res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
      return;
    }
    
    res.json({
      success: true,
      message: 'Usuario obtenido correctamente',
      data: {
        usuario
      }
    });
    
  } catch (error) {
    console.error('Error al obtener usuario por token:', error);
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error al obtener el usuario'
    });
  }
}
}

