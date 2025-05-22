const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');
const medioPagoController = require('../controllers/medioPagoController');

// Obtener todos los medios de pago
router.get('/', verificarToken, medioPagoController.obtenerMediosPago);

// Crear, actualizar y eliminar (opcionalmente solo para admin)
router.post('/', verificarToken, medioPagoController.crearMedioPago);
router.put('/:id', verificarToken, medioPagoController.actualizarMedioPago);
router.delete('/:id', verificarToken, medioPagoController.eliminarMedioPago);

module.exports = router;
