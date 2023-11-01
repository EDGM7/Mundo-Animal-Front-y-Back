var express = require('express');
var router = express.Router();
// En esta línea llamamos al controlador de animales
const animalesController = require('../controllers/animales.controller');

router.post('/agregar', animalesController.agregar);
router.get('/', animalesController.mostrar);
router.delete('/eliminar/:animalId', animalesController.eliminar);

module.exports = router;
