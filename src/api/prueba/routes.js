const express = require('express');
const router = express.Router();
const { prueba } = require('./prueba')

// @route   POST api/prueba
// @desc    Probar la api
// @access  Private

router.post('/', prueba);

module.exports = router;