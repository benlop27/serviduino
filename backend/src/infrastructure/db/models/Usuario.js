// src/infrastructure/db/models/Usuario.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Usuario = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Relación con el modelo de Rol
Usuario.belongsTo(require("./Rol"));

module.exports = Usuario;
