const express = require('express');
const router = express.Router();
const authenticate = require('../authenticate');
const { uploadPDF } = require('./contabilidad')
const multer = require('multer');
const upload = multer();

router.post('/sat',upload.fields([{name: 'file', maxCount: 1}]), authenticate, uploadPDF);

module.exports = router;