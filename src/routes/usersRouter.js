// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

// ************ Middleware ************
const uploadFile = require('../middleware/multerMiddleware');
const validations = require('../middleware/validateRegisterMiddleware');
const guestMiddleware = require('../middleware/guestMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
// ************ Controller Require ************
const userController = require('../controllers/userController');

// Formulario de registro
router.get('/register', guestMiddleware, userController.register);

// proceso de registro
router.post('/register', uploadFile.single('avatar'), validations, userController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, userController.login);

// proceso de login
router.post('/login', userController.loginProcess);

// Perfil de Usuario
router.get('/profile/', authMiddleware, userController.profile);

//logout
router.get('/logout/', userController.logout);

module.exports = router;
