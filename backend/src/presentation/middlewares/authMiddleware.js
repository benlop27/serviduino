const jwt = require("jsonwebtoken");

function autenticarToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Obtenemos el token del encabezado

  if (!token) {
    return res.status(401).json({ error: "Token requerido" });
  }

  // Verificar si el token es válido
  jwt.verify(token, process.env.JWT_SECRETO, (err, usuario) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }
    req.usuario = usuario;
    next(); // Continuar con la siguiente función
  });
}

module.exports = autenticarToken;
