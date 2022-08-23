// ************ Require's ************
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// ************ Controller Require ************
const controller = {
    register: (req, res) => {
        res.cookie('testing', 'Hola mundo', {maxAge: 1000 * 30})
        return res.render('register');
    },
    processRegister : (req,res) => {
        const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

        let userInDB = User.findByFile('email', req.body.email);

        if (userInDB) {
			return res.render('register', {
				errors: {
                    email: {
                        msg: 'este email ya esta registrado'
                    }
                },
				oldData: req.body
			});
		}

        let userToCreate = {
            ...req.body,
            clave: bcryptjs.hashSync(req.body.clave,10),
            avatar: req.file.filename
        }

        let userCreate = User.create(userToCreate);
        return res.redirect('/users/login');
    },
    login: (req, res) => {
        console.log(req.cookies.testing);
        return res.render('login');
    },
    loginProcess: (req, res) => {
        let userToLogin = User.findByFile('email', req.body.email)

        if(userToLogin) {
            let isOkPassword = bcryptjs.compareSync(req.body.clave, userToLogin.clave);
            if (isOkPassword) {
                delete userToLogin.clave;
                req.session.userLogged = userToLogin;

                if (req.body.remenber) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60});
                }


                return res.redirect('/users/profile')
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Datos invalidos'
                    }
                }
            });
        }
        return res.render('login', {
            errors: {
                email: {
                    msg: 'El email no se encuentra registrado'
                }
            }
        });
    },
    profile: (req, res) => {
        return res.render('profile', {
            user: req.session.userLogged
        });
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = controller;