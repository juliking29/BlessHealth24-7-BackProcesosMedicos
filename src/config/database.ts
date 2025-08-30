import { createPool } from "mysql2/promise";
import dotenv from "dotenv";



dotenv.config();

export const pool = createPool({
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
        const connection = await pool.getConnection();
        console.log("✅ Conexión a MySQL establecida correctamente.");
        connection.release();
    } catch (error) {
        console.error("❌ Error al conectar a MySQL:", error);
    }
})();