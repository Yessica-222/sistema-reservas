const { usuario } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro
exports.registrarUsuario = async (req, res) => {
  const { nombres, correo, contraseña, rol } = req.body;

  try {
    const usuarioExistente = await usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'Correo ya registrado' });
    }

    const hash = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = await usuario.create({
      nombres,
      correo,
      contraseña: hash,
      rol: rol || 'cliente',
    });

    res.status(201).json({ mensaje: 'Usuario registrado correctamente', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

// Login
exports.iniciarSesion = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const user = await usuario.findOne({ where: { correo } });
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const valida = await bcrypt.compare(contraseña, user.contraseña);
    if (!valida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id_usuario: user.id_usuario, rol: user.rol },
      process.env.JWT_SECRET || 'secreto123',
      { expiresIn: '2h' }
    );

    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};

// Obtener usuarios (admin)
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};
