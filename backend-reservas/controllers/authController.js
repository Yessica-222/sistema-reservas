const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const SECRET_KEY = 'tu_clave_secreta_super_segura'; // usa dotenv en producción

exports.registrar = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    const usuarioExistente = await Usuario.findOne({ where: { correo } }); // ← USA Usuario
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const hash = await bcrypt.hash(contraseña, 10);

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
    const { correo, contraseña } = req.body || {};

    if (!correo || !contraseña) {
      return res.status(400).json({ error: "Correo y contraseña son requeridos" });
    }

    const usuario = await Usuario.findOne({ where: { correo } }); // ← USA Usuario

    if (!usuario) {
      return res.status(401).json({ error: 'Correo no registrado' });
    }

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario.id_usuario, rol: usuario.rol }, SECRET_KEY, {
      expiresIn: '1h'
    });

    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor al iniciar sesión' });
  }
};