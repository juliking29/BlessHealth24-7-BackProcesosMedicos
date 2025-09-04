"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importación de módulos necesarios
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const os_1 = __importDefault(require("os"));
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
// Configuración para aceptar certificados autofirmados (SOLO DESARROLLO)
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';
// Cargar variables de entorno desde el archivo .env
// Cargar variables de entorno desde .env en la raíz
dotenv_1.default.config();
// Inicializar la aplicación Express
const app = (0, express_1.default)();
// Función para obtener la IP local de la máquina
function getLocalIP() {
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
const emergencias_routes_1 = __importDefault(require("./view/Emergencias/emergencias.routes"));
// ... otras configuraciones
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
app.use('/api', emergencias_routes_1.default);
// Configurar rutas existentes para la API
// Configurar puertos
const HTTPS_PORT = process.env["PORT"] ? Number(process.env["PORT"]) : 3000;
const HTTP_PORT = 3001;
// Configuración personalizada para HTTPS (acepta certificados autofirmados)
const httpsOptions = {
    rejectUnauthorized: false, // Acepta certificados no válidos
    requestCert: false, // No requiere certificado del cliente
    agent: false, // Deshabilita el agente de agrupamiento
};
// Iniciar servidor HTTP
http_1.default.createServer(app).listen(HTTP_PORT, '0.0.0.0', () => {
    const url = `http://${localIP}:${HTTP_PORT}`;
    const localhostUrl = `http://localhost:${HTTP_PORT}`;
    console.log(`✅ Servidor HTTP corriendo en ${url}`);
    console.log(`✅ Servidor HTTP corriendo en ${localhostUrl}`);
    qrcode_terminal_1.default.generate(url, { small: true });
    qrcode_terminal_1.default.generate(localhostUrl, { small: true });
});
// Iniciar servidor HTTPS
try {
    const keyPath = path_1.default.resolve(__dirname, '../Certificados/iqscore-key.pem');
    const certPath = path_1.default.resolve(__dirname, '../Certificados/iqscore-cert.pem');
    if (fs_1.default.existsSync(keyPath) && fs_1.default.existsSync(certPath)) {
        const key = fs_1.default.readFileSync(keyPath);
        const cert = fs_1.default.readFileSync(certPath);
        const httpsUrl = `https://${localIP}:${HTTPS_PORT}`;
        const httpsLocalhostUrl = `https://localhost:${HTTPS_PORT}`;
        https_1.default.createServer({
            key,
            cert,
            ...httpsOptions // Aplica las opciones de aceptación de certificados
        }, app).listen(HTTPS_PORT, '0.0.0.0', () => {
            console.log(`✅ Servidor HTTPS corriendo en ${httpsUrl}`);
            console.log(`✅ Servidor HTTPS corriendo en ${httpsLocalhostUrl}`);
            qrcode_terminal_1.default.generate(httpsUrl, { small: true });
            qrcode_terminal_1.default.generate(httpsLocalhostUrl, { small: true });
        });
    }
    else {
        console.warn("⚠️ Los archivos de certificado no existen. El servidor HTTPS no se iniciará.");
    }
}
catch (error) {
    console.error("❌ Error al iniciar el servidor HTTPS:", error);
}
