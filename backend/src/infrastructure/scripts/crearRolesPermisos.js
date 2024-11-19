// src/infrastructure/scripts/crearRolesPermisos.js
const Rol = require("../db/models/Rol");
const Permiso = require("../db/models/Permiso");

async function crearRolesYPermisos() {
  const admin = await Rol.create({ nombre: "admin" });
  const usuario = await Rol.create({ nombre: "usuario" });

  const crearUsuarioPermiso = await Permiso.create({ nombre: "crear_usuario" });
  const verPerfilPermiso = await Permiso.create({ nombre: "ver_perfil" });

  // Asignamos permisos a roles
  await admin.addPermiso(crearUsuarioPermiso);
  await admin.addPermiso(verPerfilPermiso);
  await usuario.addPermiso(verPerfilPermiso);
}

crearRolesYPermisos();
