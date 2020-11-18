const router = require('express').Router();

const forgetController = require('../controllers/forget/forget');

router
  .get('/forget', forgetController.getForgetFrom)
  .post('/forget', forgetController.sendForgetToken);

module.exports = router;
