// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

// ************ Multer ************
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/img/avatars')
    },
    filename: (req, file, cb) =>{
      let fileName = `${Date.now()}_img${path.extname(file.originalname)}`
      cb(null, fileName)
    }
  });
  
  const uploadFile = multer({ storage });


// ************ validations ************
const validations = [
    body('fullName').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('apellido').notEmpty().withMessage('Tienes que escribir un apellido'),
    body('email').notEmpty().withMessage('Tienes que escribir un email').bail()
                 .isEmail().withMessage('Debes escrbir un formato valido de correo'),
    body('paiss').notEmpty().withMessage('Tienes que elegir un país'),
    body('clave').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('comfir').notEmpty().withMessage('Tienes que comfirmar tu contraseña'),
    body('avatar').custom((valiue, { req }) => {
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.png', '.gif']
      
      if(!file) {
        throw new Error('Tienes que subir una imagen');
      } else {
        let fileExtension = path.extname(file.originalname)
        if (!acceptedExtensions.includes(fileExtension)) {
          throw new Error(`Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }
      }
      return true;
    })
]

// ************ Controller Require ************
const userController = require('../controllers/userController');

// Formulario de registro
router.get('/register', userController.register);

// proceso de registro
router.post('/register', uploadFile.single('avatar'), validations, userController.processRegister);

// Formulario de login
router.get('/login', userController.login);

// Perfil de Usuario
router.get('/profile/:userId', userController.profile);

module.exports = router;
