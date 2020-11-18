const router = require('express').Router();
const verifyController = require('../controllers/verify/verify');

router.get('/verify', verifyController.verifyUser);

module.exports = router;
