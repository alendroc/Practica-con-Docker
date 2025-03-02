const express = require('express');
const router = express.Router();

const clientesController = require('../Controllers/clientesController');

router.get('/cliente', clientesController.getAll);
//router.post('/cliente', clientesController.crearCliente);
router.get('/cliente/:cedula', clientesController.buscarCliente);
router.post('/cliente', clientesController.crearCliente);

module.exports = router;