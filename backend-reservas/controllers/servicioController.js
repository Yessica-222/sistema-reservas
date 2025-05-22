const { servicio } = require('../models');

// Listar servicios
exports.obtenerServicios = async (req, res) => {
  try {
    const servicios = await servicio.findAll();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
};

// Crear servicio
exports.crearServicio = async (req, res) => {
  try {
    const { nombre_servicio, duracion, precio } = req.body;
    const nuevoServicio = await servicio.create({ nombre_servicio, duracion, precio });
    res.status(201).json(nuevoServicio);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el servicio' });
  }
};

// Actualizar servicio
exports.actualizarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const servicioActual = await servicio.findByPk(id);
    if (!servicioActual) {
      return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    }

    await servicioActual.update(req.body);
    res.json({ mensaje: 'Servicio actualizado', servicio: servicioActual });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el servicio' });
  }
};

// Eliminar servicio
exports.eliminarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const servicioActual = await servicio.findByPk(id);
    if (!servicioActual) {
      return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    }

    await servicioActual.destroy();
    res.json({ mensaje: 'Servicio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el servicio' });
  }
};
