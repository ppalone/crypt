const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');

// router.use(authMiddleware.ensureAuthenticated);

router.get('/profile', authMiddleware.ensureAuthenticated, (req, res) => {
  res.render('profile/profile.ejs');
});

module.exports = router;
