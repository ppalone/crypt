const router = require('express').Router();

// Routes
const forwardAuthenticated = require('../middlewares/auth')
  .forwardAuthenticated;
// const usersHandler = require('./users');

const authRoutes = require('./auth');
const verificationRoutes = require('./verify');
const forgetRoutes = require('./forget');
const resetRoutes = require('./reset');

const blogsHandler = require('./blogs');
const profileHandler = require('./profile');

// Homepage
router.get('/', forwardAuthenticated, (req, res) => res.render('index.ejs'));

// Routes
router.use(authRoutes);
router.use(verificationRoutes);
router.use(forgetRoutes);
router.use(resetRoutes);

// router.use('/users', usersHandler);
router.use('/blogs', blogsHandler);
router.use(profileHandler);
// router.use(verificationHandler);

module.exports = router;
