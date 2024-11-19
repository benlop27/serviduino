// src/application/services/AuthService.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../../infrastructure/db/models/Usuario");
const Rol = require("../../infrastructure/db/models/Rol");

class AuthService {
  // Iniciar sesión
  async iniciarSesion(usuario, contrasena) {
    const usuarioEncontrado = await Usuario.findOne({ where: { usuario }, include: Rol });
    if (!usuarioEncontrado || !bcrypt.compareSync(contrasena, usuarioEncontrado.contrasena)) {
      throw new Error("Credenciale| inválidas");
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: usuarioEncontrado.id, rol: usuarioEncontrado.Rol.nombre },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token };
  }

  // Registrar un nuevo usuario
  async registrar(usuario, contrasena, idRol) {
    const contrasenaEncriptada = bcrypt.hashSync(contrasena, 10);
    return await Usuario.create({ usuario, contrasena: contrasenaEncriptada, idRol });
  }
}

module.exports = AuthService;
