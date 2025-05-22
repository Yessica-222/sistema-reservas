const { pago, usuario, cita, medioPago } = require('../models');

exports.obtenerPagos = async (req, res) => {
  try {
    const pagos = await pago.findAll({
      include: [usuario, cita, medioPago]
    });
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pagos' });
  }
};

exports.crearPago = async (req, res) => {
  try {
    const { fecha_pago, total, id_usuario, id_cita, id_medio_pago } = req.body;
    const nuevoPago = await pago.create({ fecha_pago, total, id_usuario, id_cita, id_medio_pago });
    res.status(201).json(nuevoPago);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pago' });
  }
};

exports.actualizarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const pagoActual = await pago.findByPk(id);
    if (!pagoActual) {
      return res.status(404).json({ mensaje: 'Pago no encontrado' });
    }

    await pagoActual.update(req.body);
    res.json({ mensaje: 'Pago actualizado', pago: pagoActual });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el pago' });
  }
};

exports.eliminarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const pagoActual = await pago.findByPk(id);
    if (!pagoActual) {
      return res.status(404).json({ mensaje: 'Pago no encontrado' });
    }

    await pagoActual.destroy();
    res.json({ mensaje: 'Pago eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pago' });
  }
};
