const express = require('express');
const router = express.Router();
const authenticate = require('../authenticate');
const { prueba, 
    createTrabajador, 
    editTrabajador, 
    getTrabajadores, 
    getBajas,
    getTrabajador, 
    getTrabajadoresByEmpresa,
    deleteTrabajador,
    altaTrabajador,
    uploadFile, 
    downloadFile,
    deleteFile,
    subirFotoPerfil, 
    crearContrato } = require('./trabajadores')
const { uploading } = require('../../utils/s3');

// @route   POST api/prueba
// @desc    Probar la api
// @access  Private
router.post('/ejemplo',prueba);

router.post('/uploadFile', uploading.single('file'),uploadFile);
router.get('/downloadFile/:URI', downloadFile);
router.post('/deleteFile/', deleteFile);


router.get('/', authenticate, getTrabajadores);
router.post('/getTrabajadoresByEmpresa', authenticate, getTrabajadoresByEmpresa);
router.get('/bajas', authenticate, getBajas);
router.post('/add',  authenticate, createTrabajador);
router.post('/edit', authenticate, editTrabajador);
router.post('/getTrabajador', authenticate, getTrabajador);
router.post('/subirFotoPerfil', uploading.single('file'), subirFotoPerfil);

router.post('/deleteTrabajador', authenticate, deleteTrabajador);
router.post('/altaTrabajador', authenticate, altaTrabajador);
router.post('/crearContrato',authenticate, crearContrato);



module.exports = router;