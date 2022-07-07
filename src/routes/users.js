// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const userController = require('../controllers/userController');

// Formulario de registro
router.get('/register', userController.register);

// proceso de registro
//router.post('/register', userController.processRegister);

// Formulario de login
router.get('/login', userController.login);

// Perfil de Usuario
router.get('/profile/:userId', userController.profile);

module.exports = router;
