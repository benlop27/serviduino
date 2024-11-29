const sequelize = require("./src/infrastructure/config/db"); 

const express = require("express");
const bodyParser = require("body-parser"); 
const authRoutes = require("./src/presentation/routes/authRoutes");
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const rabbitmqUrl = require("./src/infrastructure/repositories/RabbitMQRepository");
require("dotenv").config();


const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
console.log(process.env.FRONTEND_URL)
// Middlewares
app.use(bodyParser.json());

// Rutas 
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/api/auth", authRoutes);

rabbitmqUrl.iniciarClienteRabbitMQ();

// Sincronizar base de datos y arrancar servidor
const PORT = process.env.PORT || 3000;


sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Base de datos sincronizada!"); 


  app.listen(PORT, () => console.log(`Servicio ejecutandose en el puerto ${PORT}`));
  })
  .catch((err) => console.error("Base de datos error:", err));
