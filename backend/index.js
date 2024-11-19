const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./src/infrastructure/config/db");
const nameRoutes = require("./src/presentation/routes/nameRoutes");

require("dotenv").config();

const app = express();

// Middlewares
app.use(bodyParser.json());

// Rutas
app.use("/api/names", nameRoutes);

// Sincronizar base de datos y arrancar servidor
const PORT = process.env.PORT || 3000;
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Base de datos sincronizada!");
    app.listen(PORT, () => console.log(`Servicio ejecutandose en el puerto ${PORT}`));
  })
  .catch((err) => console.error("Base de datos error:", err));
