"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_CONFIG = void 0;
// config/jwt.ts
exports.JWT_CONFIG = {
    secret: process.env.JWT_SECRET || 'clave_secreta_super_segura_blesshealth_2024',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
};
