const express = require('express');
const router = express.Router();

const clientesController = require('../Controllers/clientesController');

router.get('/actividades', clientesController.getClientes);

router.post('/actividades', clientesController.crearCliente);

module.exports = router;