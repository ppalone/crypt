const router = require('express').Router();
const verifyController = require('../controllers/users/verify');

router.get('/verify', verifyController.verifyUser);

module.exports = router;
