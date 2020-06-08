const router = require('express').Router();
const loginController = require('../controllers/users/login');
const registerController = require('../controllers/users/register');
const logoutController = require('../controllers/users/logout');
const forwardAuthenticated = require('../middlewares/auth').forwardAuthenticated;

// Don't call the function like forwardAuthenticated()

router
    .get('/login', forwardAuthenticated ,loginController.getLoginForm)
    .post('/login', loginController.checkLoginCredentials)

    .get('/register', forwardAuthenticated, registerController.getRegisterForm)
    .post('/register', registerController.registerUser)

    .get('/logout', logoutController.logoutUser);

module.exports = router;