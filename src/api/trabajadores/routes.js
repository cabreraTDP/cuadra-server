const express = require('express');
const router = express.Router();
const authenticate = require('../authenticate');
const { prueba, createTrabajador, editTrabajador, getTrabajadores, getTrabajador, uploadFile, downloadFile } = require('./trabajadores')
const { uploading } = require('../../utils/s3');

// @route   POST api/prueba
// @desc    Probar la api
// @access  Private
router.post('/ejemplo',prueba);

router.post('/uploadFile', uploading.single('file'),uploadFile);
router.get('/downloadFile/:URI', downloadFile);


router.get('/', authenticate, getTrabajadores);
router.post('/add',  authenticate, createTrabajador);
router.post('/edit', authenticate, editTrabajador);
router.post('/getTrabajador', authenticate, getTrabajador);



module.exports = router;