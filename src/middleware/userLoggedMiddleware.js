const User = require('../models/User');
const { use } = require('../routes/mainrouter');

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByFile('email', emailInCookie);
    
    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }


    if(req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }


    next();
}

module.exports = userLoggedMiddleware;