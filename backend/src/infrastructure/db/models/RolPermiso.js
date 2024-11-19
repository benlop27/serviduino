// src/infrastructure/db/models/RolPermiso.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const RolPermiso = sequelize.define("RolPermiso", {
  rolId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Rol",  // Refleja el modelo de Rol
      key: "id",
    },
  },
  permisoId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Permiso",  // Refleja el modelo de Permiso
      key: "id",
    },
  },
});

module.exports = RolPermiso;
