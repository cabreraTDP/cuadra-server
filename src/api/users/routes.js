const express = require('express');
const router = express.Router();
const { prueba, createUser, changePassword, signIn } = require('./users')

// @route   POST api/prueba
// @desc    Probar la api
// @access  Private

router.get('/', prueba);

router.post('/createUser', createUser);
router.post('/changePassword', changePassword);
router.post('/signIn', signIn);





module.exports = router;
