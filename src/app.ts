// Importación de módulos necesarios
import express from 'express';
import http from 'http';
import dotenv from "dotenv";
import cors from 'cors';
import os from 'os';
import qrcode from 'qrcode-terminal';

// Cargar variables de entorno desde .env
dotenv.config();

// Inicializar la aplicación Express
const app = express();

// Determinar si estamos en producción
const isProduction = process.env["NODE_ENV"] === 'production';

// Función para obtener la IP local de la máquina (solo desarrollo)
function getLocalIP(): string {
  if (isProduction) return '';
  
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
import RegistroConsulta from "./view/RegistroConsulta/registroConsulta.routes";
import facturaCitaRoutes from './view/FacturaCita/facturaCita.routes';
import servicioRoutes from './view/Servicio/servicio.routes';
import emergenciasRoutes from './view/Emergencias/emergencias.routes';

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
} else {
  // ✅ MODO DESARROLLO (Local)
  const HTTP_PORT = 3001;
  
  http.createServer(app).listen(HTTP_PORT, '0.0.0.0', () => {
    const url = `http://${localIP}:${HTTP_PORT}`;
    const localhostUrl = `http://localhost:${HTTP_PORT}`;
    console.log(`🔧 Servidor desarrollo HTTP corriendo en ${url}`);
    console.log(`🔧 Servidor desarrollo HTTP corriendo en ${localhostUrl}`);
    qrcode.generate(url, { small: true });
    qrcode.generate(localhostUrl, { small: true });
  });

  // También en puerto principal para desarrollo
  app.listen(PORT, () => {
    console.log(`🔧 Servidor desarrollo ejecutándose en puerto ${PORT}`);
  });
}