const router = require('express').Router();

// Routes
const forwardAuthenticated = require('../middlewares/auth')
  .forwardAuthenticated;

const authRoutes = require('./auth');
const verificationRoutes = require('./verify');
const forgetRoutes = require('./forget');
const resetRoutes = require('./reset');
const blogsRoutes = require('./blogs');
const profileRoutes = require('./profile');

// Homepage
router.get('/', forwardAuthenticated, (req, res) => res.render('index.ejs'));

// Routes
router.use(authRoutes);
router.use(verificationRoutes);
router.use(forgetRoutes);
router.use(resetRoutes);
router.use('/blogs', blogsRoutes);
router.use(profileRoutes);

module.exports = router;
