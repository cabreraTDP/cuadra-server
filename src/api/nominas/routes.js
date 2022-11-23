const express = require('express');
const router = express.Router();
const authenticate = require('../authenticate');
const { prueba, createNomina, getNominabyCliente, getNominaById, crearFiniquito } = require('./nominas')

router.get('/', authenticate, getNominabyCliente);
router.post('/getById', authenticate, getNominaById);


router.post('/add', authenticate, createNomina);
router.post('/finiquito', authenticate, crearFiniquito);



module.exports = router;