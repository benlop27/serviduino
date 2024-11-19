const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mariadb",
  pool: {
    max: 5, // Máximo de conexiones simultáneas
    min: 0, // Mínimo de conexiones
    acquire: 30000, // Tiempo máximo de espera para obtener una conexión
    idle: 10000 // Tiempo de espera cuando una conexión está inactiva
  }
});

module.exports = sequelize;
