const express = require('express');
const authenticate = require('../authenticate');
const clearCookie = require('../clearCookie');
const router = express.Router();
const { prueba, createUser, changePassword, signIn, checkUser } = require('./users')

// @route   POST api/prueba
// @desc    Probar la api
// @access  Private

router.get('/', prueba);

router.post('/createUser', createUser);
router.post('/changePassword', changePassword);
router.post('/signIn', clearCookie, signIn);
router.post('/check', authenticate, checkUser);






module.exports = router;
