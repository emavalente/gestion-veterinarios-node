import express from "express";
import dbConection from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";

// Instancia de express.
const app = express();

// Inicio de conexión a MongoDB
dbConection();

// Asignación de puerto
const PORT = process.env.HOST_PORT || 8080;

// Habilitar lectura de json
app.use(express.json());

// Definición de URL's
app.use("/api/veterinarios", veterinarioRoutes);

// Iniciar App en puerto asignado.
app.listen(PORT, () => console.log(`Servidor iniciado en puerto: ${PORT}`));
