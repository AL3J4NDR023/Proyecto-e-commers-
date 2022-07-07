// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/maincontroller');

router.get('/', mainController.home);

module.exports = router;
