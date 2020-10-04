'use strict';

// dotenv
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const methodOverride = require('method-override');
const favicon = require('serve-favicon');
const path = require('path');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 8000;

// Routes Handlers
const routeHandler = require('./routes/index');

// Rate limiter middleware
const RateLimiterMiddleware = require('./middlewares/ratelimiter');

// Mongoose Config
require('./config/db');

// Passport
require('./config/passport')(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
// Tell express to use the public directory
app.use(express.static(path.join(__dirname + '/public')));
// Favicon
app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));

app.locals.date = require('./utils/date');

// Express Sessions
app.use(
  session({
    name: 'crypt_sid',
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === 'production',
    },
  }),
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

app.use(RateLimiterMiddleware);

// Security
app.use(helmet());

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  }),
);

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(routeHandler);

app.get('*', (req, res) => {
  res.render('errors/404');
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
