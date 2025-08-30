"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../env/.env') });
exports.pool = (0, promise_1.createPool)({
    host: process.env["MYSQL_HOST"] || "localhost",
    user: process.env["MYSQL_USER"] || "root",
    password: process.env["MYSQL_PASSWORD"] || "1",
    database: process.env["MYSQL_DATABASE"] || "test",
    port: Number(process.env["MYSQL_PORT"]) || 3306,
    waitForConnections: true,
    connectionLimit: Number(process.env["MYSQL_CONNECTION_LIMIT"]) || 10,
});
// Probar conexión
(async () => {
    try {
        const connection = await exports.pool.getConnection();
        console.log("✅ Conexión a MySQL establecida correctamente.");
        connection.release();
    }
    catch (error) {
        console.error("❌ Error al conectar a MySQL:", error);
    }
})();
