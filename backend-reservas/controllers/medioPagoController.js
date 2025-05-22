const medioPago = require('../models/medio_pago');

// Obtener todos los medios de pago
exports.obtenerMediosPago = async (req, res) => {
  try {
    const medios = await medioPago.findAll();
    res.json(medios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los medios de pago' });
  }
};

// Crear nuevo medio de pago
exports.crearMedioPago = async (req, res) => {
  try {
    const { tipo_pago } = req.body;
    const nuevoMedio = await medioPago.create({ tipo_pago });
    res.status(201).json(nuevoMedio);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el medio de pago' });
  }
};

// Actualizar medio de pago
exports.actualizarMedioPago = async (req, res) => {
  try {
    const { id } = req.params;
    const medio = await medioPago.findByPk(id);
    if (!medio) {
      return res.status(404).json({ mensaje: 'Medio de pago no encontrado' });
    }

    await medio.update(req.body);
    res.json({ mensaje: 'Medio de pago actualizado', medio });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el medio de pago' });
  }
};

// Eliminar medio de pago
exports.eliminarMedioPago = async (req, res) => {
  try {
    const { id } = req.params;
    const medio = await medioPago.findByPk(id);
    if (!medio) {
      return res.status(404).json({ mensaje: 'Medio de pago no encontrado' });
    }

    await medio.destroy();
    res.json({ mensaje: 'Medio de pago eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el medio de pago' });
  }
};
