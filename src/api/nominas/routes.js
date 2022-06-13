const express = require('express');
const router = express.Router();
const authenticate = require('../authenticate');
const { prueba, createNomina, getNominabyCliente, getNominaById } = require('./nominas')

router.get('/', authenticate, getNominabyCliente);
router.post('/getById', authenticate, getNominaById);


router.post('/add', authenticate, createNomina);



module.exports = router;