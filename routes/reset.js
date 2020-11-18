const router = require('express').Router();

const resetController = require('../controllers/reset/reset');

router
  .get('/reset/:token', resetController.getResetPassword)
  .post('/reset/:token', resetController.resetPassword);

module.exports = router;
