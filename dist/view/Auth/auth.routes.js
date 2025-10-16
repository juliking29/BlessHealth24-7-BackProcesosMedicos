"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/auth.routes.ts
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../../controller/Auth/auth.controller"));
const router = (0, express_1.Router)();
// Ruta para login (pública)
router.post('/auth/login', auth_controller_1.default.login);
// Ruta para registro (pública)
router.post('/auth/register', auth_controller_1.default.register);
// Ruta para refrescar token (pública)
router.post('/auth/refresh', auth_controller_1.default.refreshToken);
// Ruta para verificar token (pública)
router.get('/auth/verify', auth_controller_1.default.verifyToken);
router.get('/auth/usuario-actual', auth_controller_1.default.obtenerUsuarioPorToken);
exports.default = router;
