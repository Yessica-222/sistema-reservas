const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');
const citaController = require('../controllers/citaController');

router.get('/', verificarToken, citaController.obtenerCitas);
router.post('/', verificarToken, citaController.crearCita);
router.put('/:id', verificarToken, citaController.actualizarCita);
router.delete('/:id', verificarToken, citaController.eliminarCita);

module.exports = router;
