"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importación de módulos necesarios
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const os_1 = __importDefault(require("os"));
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
// Cargar variables de entorno desde .env
dotenv_1.default.config();
// Inicializar la aplicación Express
const app = (0, express_1.default)();
// Determinar si estamos en producción
const isProduction = process.env["NODE_ENV"] === 'production';
// Función para obtener la IP local de la máquina (solo desarrollo)
function getLocalIP() {
    if (isProduction)
        return '';
    const interfaces = os_1.default.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
}
const localIP = getLocalIP();
// Configurar CORS para permitir solicitudes de cualquier origen
app.use((0, cors_1.default)());
// Middleware para permitir JSON en solicitudes
app.use(express_1.default.json());
// Importar rutas de la aplicación - CLÍNICA PI3
const usuario_routes_1 = __importDefault(require("./view/Usuario/usuario.routes"));
const medico_routes_1 = __importDefault(require("./view/Usuario/medico.routes"));
const historiaClinica_routes_1 = __importDefault(require("./view/HistoriaClinica/historiaClinica.routes"));
const cita_routes_1 = __importDefault(require("./view/Citas/cita.routes"));
const autorizacion_routes_1 = __importDefault(require("./view/OrdenMedica/autorizacion.routes"));
const ordenMedica_routes_1 = __importDefault(require("./view/OrdenMedica/ordenMedica.routes"));
const registroConsulta_routes_1 = __importDefault(require("./view/RegistroConsulta/registroConsulta.routes"));
const facturaCita_routes_1 = __importDefault(require("./view/FacturaCita/facturaCita.routes"));
const servicio_routes_1 = __importDefault(require("./view/Servicio/servicio.routes"));
// Configurar rutas para la API - CLÍNICA PI3
app.use('/api', usuario_routes_1.default);
app.use('/api', medico_routes_1.default);
app.use('/api', historiaClinica_routes_1.default);
app.use('/api', cita_routes_1.default);
app.use('/api', ordenMedica_routes_1.default);
app.use('/api', autorizacion_routes_1.default);
app.use('/api', registroConsulta_routes_1.default);
app.use('/api', servicio_routes_1.default);
app.use('/api', facturaCita_routes_1.default);
// Ruta de salud para verificar que el servidor funciona
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString(),
        environment: process.env["NODE_ENV"] || 'development'
    });
});
// Configurar puerto
const PORT = process.env["PORT"] ? Number(process.env["PORT"]) : 3000;
// Iniciar servidor
if (isProduction) {
    // ✅ MODO PRODUCCIÓN (Render)
    app.listen(PORT, () => {
        console.log(`🚀 Servidor en producción ejecutándose en puerto ${PORT}`);
        console.log(`🌍 Entorno: ${process.env["NODE_ENV"]}`);
    });
}
else {
    // ✅ MODO DESARROLLO (Local)
    const HTTP_PORT = 3001;
    http_1.default.createServer(app).listen(HTTP_PORT, '0.0.0.0', () => {
        const url = `http://${localIP}:${HTTP_PORT}`;
        const localhostUrl = `http://localhost:${HTTP_PORT}`;
        console.log(`🔧 Servidor desarrollo HTTP corriendo en ${url}`);
        console.log(`🔧 Servidor desarrollo HTTP corriendo en ${localhostUrl}`);
        qrcode_terminal_1.default.generate(url, { small: true });
        qrcode_terminal_1.default.generate(localhostUrl, { small: true });
    });
    // También en puerto principal para desarrollo
    app.listen(PORT, () => {
        console.log(`🔧 Servidor desarrollo ejecutándose en puerto ${PORT}`);
    });
}
