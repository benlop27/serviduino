const express = require("express");
const router = express.Router();
const NameController = require("../controllers/NameController");
const NameService = require("../../application/services/NameService");
const SequelizeNameRepository = require("../../infrastructure/repositories/SequelizeNameRepository");

// Configuración de dependencias
const nameRepository = new SequelizeNameRepository();
const nameService = new NameService(nameRepository);
const nameController = new NameController(nameService);

// Definición de rutas
router.post("/", (req, res) => nameController.create(req, res));

module.exports = router;
