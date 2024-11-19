const Rol = require("../../infrastructure/db/models/Rol");
const Permiso = require("../../infrastructure/db/models/Permiso");

class PermisoService {
  async hasPermission(roleId, permissionName) {
    const rol = await Rol.findByPk(roleId, {
      include: { model: Permiso, where: { nombre: permissionName }, required: false },
    });
    return rol && rol.Permisos.length > 0;
  }
}

module.exports = PermisoService;
