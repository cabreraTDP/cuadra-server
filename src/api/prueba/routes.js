const express = require('express');
const authenticate = require('../authenticate');
const router = express.Router();
const { prueba, auth } = require('./prueba')

// @route   POST api/prueba
// @desc    Probar la api
// @access  Private

router.post('/', authenticate, prueba);
router.post('/auth', auth)

module.exports = router;