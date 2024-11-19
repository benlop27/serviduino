// src/presentation/middlewares/autorizacionMiddleware.js
const Rol = require("../../infrastructure/db/models/Rol");
const Permiso = require("../../infrastructure/db/models/Permiso");

function verificarPermiso(requiredPermission) {
  return async (req, res, next) => {
    try {
      const { rol } = req.usuario;  // El rol debe estar en el token JWT

      // Obtener el rol y los permisos asociados
      const rolEncontrado = await Rol.findOne({
        where: { nombre: rol },
        include: Permiso,
      });

      if (!rolEncontrado) {
        return res.status(403).json({ error: "Rol no encontrado" });
      }

      const permisos = rolEncontrado.Permisos.map((permiso) => permiso.nombre);
      if (!permisos.includes(requiredPermission)) {
        return res.status(403).json({ error: "Permiso denegado" });
      }

      next();  // Si el permiso está permitido, continuamos
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

module.exports = verificarPermiso;
