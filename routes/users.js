const router = require('express').Router();
const { body } = require('express-validator');
const loginController = require('../controllers/users/login');
const registerController = require('../controllers/users/register');
const logoutController = require('../controllers/users/logout');
const passwordController = require('../controllers/users/password');
const authMiddleware = require('../middlewares/auth');
const ensureAuthenticated = authMiddleware.ensureAuthenticated;
const forwardAuthenticated = authMiddleware.forwardAuthenticated;

// Don't call the function like forwardAuthenticated()

router
  .get('/login', forwardAuthenticated, loginController.getLoginForm)
  .post(
    '/login',
    [
      body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
      body('password', 'Please enter a valid password')
        .isLength({ min: 6 })
        .isAlphanumeric()
        .trim(),
    ],
    loginController.checkLoginCredentials,
  )

  .get('/register', forwardAuthenticated, registerController.getRegisterForm)
  .post(
    '/register',
    [
      body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
      body('password', 'Please enter a valid password')
        .isLength({ min: 6 })
        .isAlphanumeric()
        .trim(),
    ],
    registerController.registerUser,
  )

  .get('/logout', ensureAuthenticated, logoutController.logoutUser)
  .get('/forget', forwardAuthenticated, passwordController.getForgetFrom)
  .post('/forget', passwordController.sendForgetToken)

  .get('/reset', forwardAuthenticated, passwordController.getResetPassword)
  .post(
    '/reset',
    [
      body('password', 'Please enter a valid password')
        .isLength({ min: 6 })
        .isAlphanumeric()
        .trim(),
    ],
    passwordController.resetPassword,
  );

module.exports = router;
