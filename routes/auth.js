const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');
const authController = require('../controllers/auth/auth');
const validators = require('../validators/validators');

router
  .get(
    '/login',
    authMiddleware.forwardAuthenticated,
    authController.getLoginForm,
  )
  .post('/login', authController.checkLoginCredentials)
  .get(
    '/register',
    authMiddleware.forwardAuthenticated,
    authController.getRegisterForm,
  )
  .post(
    '/register',
    validators.registerValidations(),
    authController.registerUser,
  )
  .get('/logout', authMiddleware.ensureAuthenticated, authController.logout);

module.exports = router;
