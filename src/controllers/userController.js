// ************ Require's ************
const fs = require('fs');
const path = require('path');

// ************ Controller Require ************
const controller = {
    register: (req, res) => {
        return res.render('register');
    },
    login: (req, res) => {
        return res.render('login');
    },
    profile: (req, res) => {
        return res.render('profile');
    }
}

module.exports = controller;