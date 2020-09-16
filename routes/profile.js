const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');
const { route } = require('./users');

router.use(authMiddleware.ensureAuthenticated);

router.get('/profile', (req, res) => {
  res.render('profile/profile.ejs');
});

router.delete('/profile/delete', (req, res) => {
  res.send('Delete the Profile');
});

module.exports = router;
