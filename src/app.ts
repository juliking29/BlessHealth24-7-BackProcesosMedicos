
// Importación de módulos necesarios
import express from 'express';
import fs from 'fs';
import https from 'https';
import http from 'http';
import dotenv from "dotenv";
import path from 'path';
import cors from 'cors';
import os from 'os';
import qrcode from 'qrcode-terminal';

// Configuración para aceptar certificados autofirmados (SOLO DESARROLLO)
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0'; 

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../../env/.env') });

// Inicializar la aplicación Express
const app = express();

// Función para obtener la IP local de la máquina
function getLocalIP(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]!) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIP();

// Configurar CORS para permitir solicitudes de cualquier origen
app.use(cors());

// Middleware para permitir JSON en solicitudes
app.use(express.json());

// Importar rutas de la aplicación - CLÍNICA PI3
import usuarioRoutes from './view/Usuario/usuario.routes';
import medicoRoutes from './view/Usuario/medico.routes';
import historiaClinicaRoutes from './view/HistoriaClinica/historiaClinica.routes';
import citaRoutes from './view/Citas/cita.routes';
import autorizacionRoutes from './view/OrdenMedica/autorizacion.routes';
import ordenMedicaRoutes from './view/OrdenMedica/ordenMedica.routes';
import RegistroConsulta from "./view/RegistroConsulta/registroConsulta.routes"
import facturaCitaRoutes from './view/FacturaCita/facturaCita.routes';
import servicioRoutes from './view/Servicio/servicio.routes';
import emergenciasRoutes from './view/Emergencias/emergencias.routes';




// ... otras configuraciones


// Configurar rutas para la API - CLÍNICA PI3
app.use('/api', usuarioRoutes);
app.use('/api', medicoRoutes);
app.use('/api', historiaClinicaRoutes);
app.use('/api', citaRoutes);
app.use('/api', ordenMedicaRoutes);
app.use('/api', autorizacionRoutes);
app.use('/api', RegistroConsulta);
app.use('/api', servicioRoutes);
app.use('/api', facturaCitaRoutes);
app.use('/api', emergenciasRoutes);

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
http.createServer(app).listen(HTTP_PORT, '0.0.0.0', () => {
  const url = `http://${localIP}:${HTTP_PORT}`;
  const localhostUrl = `http://localhost:${HTTP_PORT}`;
  console.log(`✅ Servidor HTTP corriendo en ${url}`);
  console.log(`✅ Servidor HTTP corriendo en ${localhostUrl}`);
  qrcode.generate(url, { small: true });
  qrcode.generate(localhostUrl, { small: true });
});

// Iniciar servidor HTTPS
try {
  const keyPath = path.resolve(__dirname, '../Certificados/iqscore-key.pem');
  const certPath = path.resolve(__dirname, '../Certificados/iqscore-cert.pem');

  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    const key = fs.readFileSync(keyPath);
    const cert = fs.readFileSync(certPath);

    const httpsUrl = `https://${localIP}:${HTTPS_PORT}`;
    const httpsLocalhostUrl = `https://localhost:${HTTPS_PORT}`;
    
    https.createServer({ 
      key, 
      cert,
      ...httpsOptions // Aplica las opciones de aceptación de certificados
    }, app).listen(HTTPS_PORT, '0.0.0.0', () => {
      console.log(`✅ Servidor HTTPS corriendo en ${httpsUrl}`);
      console.log(`✅ Servidor HTTPS corriendo en ${httpsLocalhostUrl}`);
      qrcode.generate(httpsUrl, { small: true });
      qrcode.generate(httpsLocalhostUrl, { small: true });
    });
  } else {
    console.warn("⚠️ Los archivos de certificado no existen. El servidor HTTPS no se iniciará.");
  }
} catch (error) {
  console.error("❌ Error al iniciar el servidor HTTPS:", error);
}