// src/infrastructure/db/models/Rol.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Permiso = require("./Permiso");

const Rol = sequelize.define("Rol", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Cada rol tiene un nombre único
  },
});

// Relación entre Rol y Permiso (muchos a muchos)
Rol.belongsToMany(Permiso, { through: "RolPermiso" });
Permiso.belongsToMany(Rol, { through: "RolPermiso" });

module.exports = Rol;
