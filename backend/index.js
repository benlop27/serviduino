const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./src/infrastructure/config/db"); 
const authRoutes = require("./src/presentation/routes/authRoutes");

require("dotenv").config();

const app = express();

// Middlewares
app.use(bodyParser.json());

// Rutas 
app.use("/api/auth", authRoutes); 




// Sincronizar base de datos y arrancar servidor
const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => console.log(`Servicio ejecutandose en el puerto ${PORT}`));