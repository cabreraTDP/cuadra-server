const express = require('express');
const router = express.Router();
const authenticate = require('../authenticate');
const { prueba, createNomina } = require('./nominas')

// @route   POST api/prueba
// @desc    Probar la api
// @access  Private

router.get('/', prueba);

router.post('/add', authenticate, createNomina);


module.exports = router;