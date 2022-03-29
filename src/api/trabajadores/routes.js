const express = require('express');
const router = express.Router();
const authenticate = require('../authenticate');
const { prueba, createTrabajador, editTrabajador } = require('./trabajadores')

// @route   POST api/prueba
// @desc    Probar la api
// @access  Private

router.get('/', prueba);
router.post('/add', authenticate, createTrabajador);
router.post('/edit', authenticate, editTrabajador);



module.exports = router;