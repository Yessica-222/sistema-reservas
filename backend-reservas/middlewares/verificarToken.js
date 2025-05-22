const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tu_clave_secreta_super_segura'; // Usa dotenv en producción

function verificarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ mensaje: 'Token requerido' });

  try {
    const verificado = jwt.verify(token.split(' ')[1], SECRET_KEY);
    req.usuario = verificado;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
}

module.exports = verificarToken;
