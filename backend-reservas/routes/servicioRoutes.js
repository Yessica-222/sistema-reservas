const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');
const servicioController = require('../controllers/servicioController');

router.get('/', servicioController.obtenerServicios);
router.post('/', verificarToken, servicioController.crearServicio);
router.put('/:id', verificarToken, servicioController.actualizarServicio);
router.delete('/:id', verificarToken, servicioController.eliminarServicio);

module.exports = router;
