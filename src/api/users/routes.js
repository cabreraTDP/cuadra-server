const express = require('express');
const router = express.Router();
const { prueba, createUser, changePassword } = require('./users')

// @route   POST api/prueba
// @desc    Probar la api
// @access  Private

router.get('/', prueba);

router.post('/createUser', createUser);
router.post('/changePassword', changePassword);




module.exports = router;
