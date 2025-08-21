"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_model_1 = __importDefault(require("../../Model/Uusario/usuario.model"));
const node_inspector_1 = require("node:inspector");
class UsuarioController {
    // Método para obtener todos los usuarios
    // Method to get all users
    static async obtenerTodos(_req, res) {
        try {
            const usuarios = await usuario_model_1.default.obtenerTodos();
            res.json({
                success: true,
                data: usuarios,
                message: 'Usuarios obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener los usuarios',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Método para obtener usuarios por rol
    // Method to get users by role
    static async obtenerPorRol(req, res) {
        try {
            const { idRol } = req.params;
            if (!idRol) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El ID del rol es requerido'
                });
                return;
            }
            const usuarios = await usuario_model_1.default.obtenerPorRol(Number(idRol));
            res.json({
                success: true,
                data: usuarios,
                message: 'Usuarios obtenidos correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener usuarios por rol',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Método para obtener un usuario por su ID
    // Method to get a user by ID
    static async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const usuario = await usuario_model_1.default.obtenerPorId(Number(id));
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener el usuario',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Método para obtener un usuario por número de documento
    // Method to get a user by document number
    static async obtenerPorDocumento(req, res) {
        try {
            const { numeroDocumento } = req.params;
            if (!numeroDocumento) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El número de documento es requerido'
                });
                return;
            }
            const usuario = await usuario_model_1.default.obtenerPorDocumento(numeroDocumento);
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener el usuario por documento',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Método para obtener un usuario por email
    // Method to get a user by email
    static async obtenerPorEmail(req, res) {
        try {
            const { email } = req.params;
            if (!email) {
                res.status(400).json({
                    success: false,
                    mensaje: 'El email es requerido'
                });
                return;
            }
            const usuario = await usuario_model_1.default.obtenerPorEmail(email);
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener el usuario por email',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Método para crear un nuevo usuario
    // Method to create a new user
    static async crear(req, res) {
        try {
            const usuario = req.body;
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
            const usuarioExistentePorDoc = await usuario_model_1.default.obtenerPorDocumento(usuario.numeroDocumento);
            if (usuarioExistentePorDoc) {
                res.status(409).json({
                    success: false,
                    mensaje: 'Ya existe un usuario con ese número de documento'
                });
                return;
            }
            const usuarioExistentePorEmail = await usuario_model_1.default.obtenerPorEmail(usuario.emailUsuario);
            if (usuarioExistentePorEmail) {
                res.status(409).json({
                    success: false,
                    mensaje: 'Ya existe un usuario con ese email'
                });
                return;
            }
            const idUsuario = await usuario_model_1.default.crear(usuario);
            res.status(201).json({
                success: true,
                data: { idUsuario },
                mensaje: 'Usuario creado correctamente'
            });
        }
        catch (error) {
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
    static async actualizar(req, res) {
        try {
            const { documento } = req.params;
            const documentoStr = String(documento);
            const usuario = req.body;
            node_inspector_1.console.log("========= ACTUALIZAR USUARIO =========");
            node_inspector_1.console.log("documento recibido en params:", documento);
            node_inspector_1.console.log("documento como string:", documentoStr);
            // Verificar que el usuario existe
            const usuarioExistente = await usuario_model_1.default.obtenerPorDocumento(documentoStr);
            if (!usuarioExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Usuario no encontrado'
                });
                return;
            }
            // Validar email único si se está cambiando
            if (usuario.emailUsuario && usuario.emailUsuario !== usuarioExistente.emailUsuario) {
                const usuarioConMismoEmail = await usuario_model_1.default.obtenerPorEmail(usuario.emailUsuario);
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
                const usuarioConMismoDoc = await usuario_model_1.default.obtenerPorDocumento(usuario.numeroDocumento);
                if (usuarioConMismoDoc && usuarioConMismoDoc.idUsuario !== usuarioExistente.idUsuario) {
                    res.status(409).json({
                        success: false,
                        mensaje: 'Ya existe otro usuario con ese número de documento'
                    });
                    return;
                }
            }
            // Actualizar usando el ID del usuario existente
            const usuarioActualizado = await usuario_model_1.default.actualizar(usuarioExistente.idUsuario, usuario);
            res.json({
                success: true,
                data: usuarioActualizado,
                mensaje: 'Usuario actualizado correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al actualizar el usuario',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Método para eliminar (desactivar) un usuario por su número de documento
    static async eliminar(req, res) {
        try {
            const { documento } = req.params;
            const documentoStr = String(documento);
            // Verificar que el usuario existe
            const usuarioExistente = await usuario_model_1.default.obtenerPorDocumento(documentoStr);
            if (!usuarioExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Usuario no encontrado'
                });
                return;
            }
            await usuario_model_1.default.eliminar(usuarioExistente.idUsuario); // aún se elimina por ID internamente
            res.json({
                success: true,
                mensaje: 'Usuario eliminado correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al eliminar el usuario',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Método para eliminar físicamente un usuario por su número de documento
    static async eliminarFisicamente(req, res) {
        try {
            const { documento } = req.params;
            const documentoStr = String(documento);
            // Verificar que el usuario existe
            const usuarioExistente = await usuario_model_1.default.obtenerPorDocumento(documentoStr);
            if (!usuarioExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Usuario no encontrado'
                });
                return;
            }
            await usuario_model_1.default.eliminarFisicamente(usuarioExistente.idUsuario); // aún se usa ID internamente
            res.json({
                success: true,
                mensaje: 'Usuario eliminado físicamente'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al eliminar físicamente el usuario',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // Método para obtener datos auxiliares (tipos de documento, roles, sedes)
    // Method to get auxiliary data (document types, roles, locations)
    static async obtenerDatosAuxiliares(_req, res) {
        try {
            const [tiposDocumento, roles, sedes] = await Promise.all([
                usuario_model_1.default.obtenerTiposDocumento(),
                usuario_model_1.default.obtenerRoles(),
                usuario_model_1.default.obtenerSedes()
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener datos auxiliares',
                error: error instanceof Error ? error.message : error
            });
        }
    }
}
exports.default = UsuarioController;
