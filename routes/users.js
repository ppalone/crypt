const router = require('express').Router();

router
    .get('/login', (req, res) => res.render('./users/login'))

module.exports = router;