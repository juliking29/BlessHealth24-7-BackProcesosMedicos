"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const os_1 = __importDefault(require("os"));
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const usuario_routes_1 = __importDefault(require("./view/Usuario/usuario.routes"));
const medico_routes_1 = __importDefault(require("./view/Usuario/medico.routes"));
const historiaClinica_routes_1 = __importDefault(require("./view/HistoriaClinica/historiaClinica.routes"));
const cita_routes_1 = __importDefault(require("./view/Citas/cita.routes"));
const autorizacion_routes_1 = __importDefault(require("./view/OrdenMedica/autorizacion.routes"));
const ordenMedica_routes_1 = __importDefault(require("./view/OrdenMedica/ordenMedica.routes"));
const registroConsulta_routes_1 = __importDefault(require("./view/RegistroConsulta/registroConsulta.routes"));
const facturaCita_routes_1 = __importDefault(require("./view/FacturaCita/facturaCita.routes"));
const servicio_routes_1 = __importDefault(require("./view/Servicio/servicio.routes"));
app.use('/api', usuario_routes_1.default);
app.use('/api', medico_routes_1.default);
app.use('/api', historiaClinica_routes_1.default);
app.use('/api', cita_routes_1.default);
app.use('/api', ordenMedica_routes_1.default);
app.use('/api', autorizacion_routes_1.default);
app.use('/api', registroConsulta_routes_1.default);
app.use('/api', servicio_routes_1.default);
app.use('/api', facturaCita_routes_1.default);
const HTTPS_PORT = process.env["PORT"] ? Number(process.env["PORT"]) : 3000;
const HTTP_PORT = 3001;
const httpsOptions = {
    rejectUnauthorized: false,
    requestCert: false,
    agent: false,
};
http_1.default.createServer(app).listen(HTTP_PORT, '0.0.0.0', () => {
    const url = `http://${localIP}:${HTTP_PORT}`;
    const localhostUrl = `http://localhost:${HTTP_PORT}`;
    console.log(`✅ Servidor HTTP corriendo en ${url}`);
    console.log(`✅ Servidor HTTP corriendo en ${localhostUrl}`);
    qrcode_terminal_1.default.generate(url, { small: true });
    qrcode_terminal_1.default.generate(localhostUrl, { small: true });
});
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
            ...httpsOptions
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
//# sourceMappingURL=app(copia%20para%20fuera%20de%20render).js.map