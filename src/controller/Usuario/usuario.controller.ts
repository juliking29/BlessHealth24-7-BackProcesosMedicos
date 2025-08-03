// controller/usuario/usuario.controller.ts
import { Request, Response } from 'express';
import UsuarioModel from '../../Model/Uusario/usuario.model';
import Usuario from '../../interfaces/Usuario/usuario.interface';
import { console } from 'node:inspector';

export default class UsuarioController {

            // Método para obtener todos los usuarios
            // Method to get all users
            public static async obtenerTodos(_req: Request, res: Response): Promise<void> {
                try {
                const usuarios = await UsuarioModel.obtenerTodos();
                res.json({
                    success: true,
                    data: usuarios,
                    message: 'Usuarios obtenidos correctamente'
                });
                } catch (error) {
                res.status(500).json({ 
                    success: false,
                    mensaje: 'Error al obtener los usuarios', 
                    error: error instanceof Error ? error.message : error 
                });
                }
            }

            // Método para obtener usuarios por rol
            // Method to get users by role
            public static async obtenerPorRol(req: Request, res: Response): Promise<void> {
                try {
                const { idRol } = req.params;

                if (!idRol) {
                    res.status(400).json({ 
                    success: false,
                    mensaje: 'El ID del rol es requerido' 
                    });
                    return;
                }

                const usuarios = await UsuarioModel.obtenerPorRol(Number(idRol));
                res.json({
                    success: true,
                    data: usuarios,
                    message: 'Usuarios obtenidos correctamente'
                });
                } catch (error) {
                res.status(500).json({ 
                    success: false,
                    mensaje: 'Error al obtener usuarios por rol', 
                    error: error instanceof Error ? error.message : error 
                });
                }
            }

            // Método para obtener un usuario por su ID
            // Method to get a user by ID
            public static async obtenerPorId(req: Request, res: Response): Promise<void> {
                try {
                const { id } = req.params;
                const usuario = await UsuarioModel.obtenerPorId(Number(id));

                if (!usuario) {
                    res.status(404).json({ 
                    success: false,
                    mensaje: 'Usuario no encontrado' 
                    });
                    return;
                }

                res.json({
                    success: true,
                    data: usuario,
                    message: 'Usuario obtenido correctamente'
                });
                } catch (error) {
                res.status(500).json({ 
                    success: false,
                    mensaje: 'Error al obtener el usuario', 
                    error: error instanceof Error ? error.message : error 
                });
                }
            }

            // Método para obtener un usuario por número de documento
            // Method to get a user by document number
            public static async obtenerPorDocumento(req: Request, res: Response): Promise<void> {
                try {
                const { numeroDocumento } = req.params;

                if (!numeroDocumento) {
                    res.status(400).json({ 
                    success: false,
                    mensaje: 'El número de documento es requerido' 
                    });
                    return;
                }

                const usuario = await UsuarioModel.obtenerPorDocumento(numeroDocumento);

                if (!usuario) {
                    res.status(404).json({ 
                    success: false,
                    mensaje: 'Usuario no encontrado' 
                    });
                    return;
                }

                res.json({
                    success: true,
                    data: usuario,
                    message: 'Usuario obtenido correctamente'
                });
                } catch (error) {
                res.status(500).json({ 
                    success: false,
                    mensaje: 'Error al obtener el usuario por documento', 
                    error: error instanceof Error ? error.message : error 
                });
                }
            }

            // Método para obtener un usuario por email
            // Method to get a user by email
            public static async obtenerPorEmail(req: Request, res: Response): Promise<void> {
                try {
                const { email } = req.params;

                if (!email) {
                    res.status(400).json({ 
                    success: false,
                    mensaje: 'El email es requerido' 
                    });
                    return;
                }

                const usuario = await UsuarioModel.obtenerPorEmail(email);

                if (!usuario) {
                    res.status(404).json({ 
                    success: false,
                    mensaje: 'Usuario no encontrado' 
                    });
                    return;
                }

                res.json({
                    success: true,
                    data: usuario,
                    message: 'Usuario obtenido correctamente'
                });
                } catch (error) {
                res.status(500).json({ 
                    success: false,
                    mensaje: 'Error al obtener el usuario por email', 
                    error: error instanceof Error ? error.message : error 
                });
                }
            }

            // Método para crear un nuevo usuario
            // Method to create a new user
            public static async crear(req: Request, res: Response): Promise<void> {
                try {
                const usuario: Usuario = req.body;

                // Validaciones básicas
                if (!usuario.numeroDocumento || !usuario.nombreUsuario || !usuario.apellidoUsuario || 
                    !usuario.emailUsuario || !usuario.telefonoUsuario || !usuario.direccionUsuario || 
                    !usuario.idRol || !usuario.tipoDocumento) {
                    res.status(400).json({ 
                    success: false,
                    mensaje: 'Faltan campos obligatorios' 
                    });
                    return;
                }

                // Verificar si ya existe un usuario con el mismo documento o email
                const usuarioExistentePorDoc = await UsuarioModel.obtenerPorDocumento(usuario.numeroDocumento);
                if (usuarioExistentePorDoc) {
                    res.status(409).json({ 
                    success: false,
                    mensaje: 'Ya existe un usuario con ese número de documento' 
                    });
                    return;
                }

                const usuarioExistentePorEmail = await UsuarioModel.obtenerPorEmail(usuario.emailUsuario);
                if (usuarioExistentePorEmail) {
                    res.status(409).json({ 
                    success: false,
                    mensaje: 'Ya existe un usuario con ese email' 
                    });
                    return;
                }

                const idUsuario = await UsuarioModel.crear(usuario);
                res.status(201).json({ 
                    success: true,
                    data: { idUsuario },
                    mensaje: 'Usuario creado correctamente' 
                });
                } catch (error) {
                res.status(500).json({ 
                    success: false,
                    mensaje: 'Error al crear el usuario', 
                    error: error instanceof Error ? error.message : error 
                });
                }
            }

            // Método para actualizar un usuario por su ID
            // Method to update a user by ID
            // Método para actualizar un usuario por su ID
                public static async actualizar(req: Request, res: Response): Promise<void> {
            try {
                const { documento } = req.params;
                const documentoStr: string = String(documento);
                const usuario: Partial<Usuario> = req.body;
                            
                                console.log("========= ACTUALIZAR USUARIO =========");
                console.log("documento recibido en params:", documento);
                console.log("documento como string:", documentoStr);

                // Verificar que el usuario existe
                const usuarioExistente = await UsuarioModel.obtenerPorDocumento(documentoStr);
                if (!usuarioExistente) {
                    res.status(404).json({ 
                        success: false,
                        mensaje: 'Usuario no encontrado' 
                    });
                    return;
                }

                // Validar email único si se está cambiando
                if (usuario.emailUsuario && usuario.emailUsuario !== usuarioExistente.emailUsuario) {
                    const usuarioConMismoEmail = await UsuarioModel.obtenerPorEmail(usuario.emailUsuario);
                    if (usuarioConMismoEmail && usuarioConMismoEmail.idUsuario !== usuarioExistente.idUsuario) {
                        res.status(409).json({ 
                            success: false,
                            mensaje: 'Ya existe otro usuario con ese email' 
                        });
                        return;
                    }
                }

                // Validar documento único si se está cambiando
                if (usuario.numeroDocumento && usuario.numeroDocumento !== usuarioExistente.numeroDocumento) {
                    const usuarioConMismoDoc = await UsuarioModel.obtenerPorDocumento(usuario.numeroDocumento);
                    if (usuarioConMismoDoc && usuarioConMismoDoc.idUsuario !== usuarioExistente.idUsuario) {
                        res.status(409).json({ 
                            success: false,
                            mensaje: 'Ya existe otro usuario con ese número de documento' 
                        });
                        return;
                    }
                }

                // Actualizar usando el ID del usuario existente
                const usuarioActualizado = await UsuarioModel.actualizar(usuarioExistente.idUsuario, usuario);
                
                res.json({ 
                    success: true,
                    data: usuarioActualizado,
                    mensaje: 'Usuario actualizado correctamente' 
                });
            } catch (error) {
                res.status(500).json({ 
                    success: false,
                    mensaje: 'Error al actualizar el usuario', 
                    error: error instanceof Error ? error.message : error 
                });
            }
        }
            // Método para eliminar (desactivar) un usuario por su número de documento
                public static async eliminar(req: Request, res: Response): Promise<void> {
                    try {
                        const { documento } = req.params;
                        const documentoStr: string = String(documento);

                        // Verificar que el usuario existe
                        const usuarioExistente = await UsuarioModel.obtenerPorDocumento(documentoStr);
                        if (!usuarioExistente) {
                            res.status(404).json({ 
                                success: false,
                                mensaje: 'Usuario no encontrado' 
                            });
                            return;
                        }

                        await UsuarioModel.eliminar(usuarioExistente.idUsuario); // aún se elimina por ID internamente
                        res.json({ 
                            success: true,
                            mensaje: 'Usuario eliminado correctamente' 
                        });
                    } catch (error) {
                        res.status(500).json({ 
                            success: false,
                            mensaje: 'Error al eliminar el usuario', 
                            error: error instanceof Error ? error.message : error 
                        });
                    }
                }



                // Método para eliminar físicamente un usuario por su número de documento
            public static async eliminarFisicamente(req: Request, res: Response): Promise<void> {
                try {
                    const { documento } = req.params;
                    const documentoStr: string = String(documento);

                    // Verificar que el usuario existe
                    const usuarioExistente = await UsuarioModel.obtenerPorDocumento(documentoStr);
                    if (!usuarioExistente) {
                        res.status(404).json({ 
                            success: false,
                            mensaje: 'Usuario no encontrado' 
                        });
                        return;
                    }

                    await UsuarioModel.eliminarFisicamente(usuarioExistente.idUsuario); // aún se usa ID internamente
                    res.json({ 
                        success: true,
                        mensaje: 'Usuario eliminado físicamente' 
                    });
                } catch (error) {
                    res.status(500).json({ 
                        success: false,
                        mensaje: 'Error al eliminar físicamente el usuario', 
                        error: error instanceof Error ? error.message : error 
                    });
                }
            }


            // Método para obtener datos auxiliares (tipos de documento, roles, sedes)
            // Method to get auxiliary data (document types, roles, locations)
            public static async obtenerDatosAuxiliares(_req: Request, res: Response): Promise<void> {
                try {
                const [tiposDocumento, roles, sedes] = await Promise.all([
                    UsuarioModel.obtenerTiposDocumento(),
                    UsuarioModel.obtenerRoles(),
                    UsuarioModel.obtenerSedes()
                ]);

                res.json({
                    success: true,
                    data: {
                    tiposDocumento,
                    roles,
                    sedes
                    },
                    message: 'Datos auxiliares obtenidos correctamente'
                });
                } catch (error) {
                res.status(500).json({ 
                    success: false,
                    mensaje: 'Error al obtener datos auxiliares', 
                    error: error instanceof Error ? error.message : error 
                });
                }
            }
}