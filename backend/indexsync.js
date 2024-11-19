const sequelize = require("./src/infrastructure/config/db"); 



sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Base de datos sincronizada!"); 
  })
  .catch((err) => console.error("Base de datos error:", err));
