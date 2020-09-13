// dotenv
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 8000;

// Routes Handlers
const usersHandler = require('./routes/users');
const blogsHandler = require('./routes/blogs');
const verificationHandler = require('./routes/verify');

// Mongoose Config
require('./config/db');

// Passport
require('./config/passport')(passport);

// Error Resolved the app wasn't authenticating because I didn't add body parser middleware
// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
// Tell express to use the public directory
app.use(express.static(__dirname + '/public'));
// Momentjs
app.locals.moment = require('moment');

// Express Sessions
app.use(
	session({
		secret: 'code',
		resave: true,
		saveUninitialized: true,
	})
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Method override
app.use(
	methodOverride(function (req, res) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			// look in urlencoded POST bodies and delete it
			var method = req.body._method;
			delete req.body._method;
			return method;
		}
	})
);

// Global Variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

app.get('/', (req, res) => res.render('index.ejs'));
app.use('/users', usersHandler);
app.use('/blogs', blogsHandler);
app.use(verificationHandler);

app.get('*', (req, res) => {
	res.render('errors/404');
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
