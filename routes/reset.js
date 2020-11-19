const router = require('express').Router();

const validators = require('../validators/validators');

const resetController = require('../controllers/reset/reset');

router
  .get('/reset/:token', resetController.getResetPassword)
  .post(
    '/reset/:token',
    validators.resetPasswordValidations(),
    resetController.resetPassword,
  );

module.exports = router;
