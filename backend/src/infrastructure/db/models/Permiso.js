// src/infrastructure/db/models/Permiso.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Permiso = sequelize.define("Permiso", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Cada permiso tiene un nombre único
  },
});

module.exports = Permiso;
