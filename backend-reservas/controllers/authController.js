const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const SECRET_KEY = 'tu_clave_secreta_super_segura'; // usa dotenv en producción

exports.registrar = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    // Verifica si el correo ya existe
    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Encripta la contraseña
    const hash = await bcrypt.hash(contraseña, 10);

    // Crea el usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      contraseña: hash,
      rol
    });

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const coincide = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!coincide) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario.id_usuario, rol: usuario.rol },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
