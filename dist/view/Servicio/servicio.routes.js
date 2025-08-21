"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const servicio_controller_1 = __importDefault(require("../../controller/Servicio/servicio.controller"));
const router = (0, express_1.Router)();
router.get('/servicios/especialidad-texto/:idEspecialidad', servicio_controller_1.default.obtenerPorEspecialidadTexto);
router.get('/servicios/todos-texto', servicio_controller_1.default.obtenerTodosServiciosTexto);
router.get('/servicios/especialidad/:idEspecialidad', servicio_controller_1.default.obtenerPorEspecialidad);
exports.default = router;
//# sourceMappingURL=servicio.routes.js.map