const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');
const pagoController = require('../controllers/pagoController');

router.get('/', verificarToken, pagoController.obtenerPagos);
router.post('/', verificarToken, pagoController.crearPago);
router.put('/:id', verificarToken, pagoController.actualizarPago);
router.delete('/:id', verificarToken, pagoController.eliminarPago);

module.exports = router;
