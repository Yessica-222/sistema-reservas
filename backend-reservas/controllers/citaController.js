const { cita, usuario, servicio } = require('../models');

// Obtener todas las citas
exports.obtenerCitas = async (req, res) => {
  try {
    const citas = await cita.findAll({
      include: [usuario, servicio]
    });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener citas' });
  }
};

// Crear nueva cita
exports.crearCita = async (req, res) => {
  try {
    const { fecha_hora, id_usuario, id_servicio } = req.body;

    const nuevaCita = await cita.create({
      fecha_hora,
      id_usuario,
      id_servicio
    });

    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la cita' });
  }
};

// Actualizar estado de cita
exports.actualizarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const citaActual = await cita.findByPk(id);
    if (!citaActual) {
      return res.status(404).json({ mensaje: 'Cita no encontrada' });
    }

    citaActual.estado = estado;
    await citaActual.save();

    res.json({ mensaje: 'Estado actualizado', cita: citaActual });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cita' });
  }
};

// Eliminar una cita
exports.eliminarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const citaActual = await cita.findByPk(id);
    if (!citaActual) {
      return res.status(404).json({ mensaje: 'Cita no encontrada' });
    }

    await citaActual.destroy();
    res.json({ mensaje: 'Cita eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cita' });
  }
};
