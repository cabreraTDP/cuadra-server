const express = require('express');
const router = express.Router();
const authenticate = require('../authenticate');
const { uploadPDF, crearOperacion, getOperaciones } = require('./contabilidad')
const multer = require('multer');
const upload = multer();

router.get('/operaciones', authenticate, getOperaciones);

router.post('/sat',upload.fields([{name: 'file', maxCount: 1}]), authenticate, uploadPDF);
router.post('/crear', authenticate, crearOperacion);

module.exports = router;