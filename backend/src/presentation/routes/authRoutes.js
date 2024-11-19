// src/presentation/routes/authRoutes.js
const express = require("express");
const ServicioAutenticacion = require("../../application/services/AuthService");
const autenticarToken = require("../middlewares/authMiddleware");
const verificarPermiso = require("../middlewares/autorizationMiddleware");

const router = express.Router();
const servicioAutenticacion = new ServicioAutenticacion();

// Ruta para registrar un nuevo usuario
router.post("/registrar", async (req, res) => {
  try {
    const { usuario, contrasena, idRol } = req.body;
    const usuarioRegistrado = await servicioAutenticacion.registrar(usuario, contrasena, idRol);
    res.status(201).json(usuarioRegistrado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener el perfil (cualquier usuario autenticado puede)
router.get("/perfil", autenticarToken, verificarPermiso("ver_perfil"), (req, res) => {
  res.json({ mensaje: "Perfil de usuario", usuario: req.usuario });
});

// Ruta para iniciar sesión y obtener un token JWT
router.post("/iniciar-sesion", async (req, res) => {
  const { usuario, contrasena } = req.body;
  const { token } = await servicioAutenticacion.iniciarSesion(usuario, contrasena);
  res.json({ token });
  try {
   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
