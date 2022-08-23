const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('fullName').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('email').notEmpty().withMessage('Tienes que escribir un email').bail()
                 .isEmail().withMessage('Debes escrbir un formato valido de correo'),
    body('paiss').notEmpty().withMessage('Tienes que elegir un país'),
    body('clave').notEmpty().withMessage('Tienes que escribir una contraseña'),
    //body('comfir').notEmpty().withMessage('Tienes que comfirmar tu contraseña'),
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