const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Name = sequelize.define("Name", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Name;
