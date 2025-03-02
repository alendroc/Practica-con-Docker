const express = require('express');
const router = express.Router();

const actividadesController = require('../Controllers/actividadesController');

router.get('/actividades/:id', actividadesController.buscarActividad);

//router.post('/actividades', actividadesController.crearActividad);

module.exports = router;