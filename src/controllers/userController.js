// ************ Require's ************
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator')

// ************ Controller Require ************
const controller = {
    register: (req, res) => {
        return res.render('register');
    },
    processRegister : (req,res) => {
        const resultValidation = validationResult(req);

        //console.log(res.send(resultValidation.errors.length > 0)); 

        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
    },
    login: (req, res) => {
        return res.render('login');
    },
    profile: (req, res) => {
        return res.render('profile');
    }
}

module.exports = controller;