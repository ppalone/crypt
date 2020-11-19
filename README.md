# Crypt

㊙ A secret & secure place where you only can view your blogs 📝

### Features 🍰

- [x] Secure Authentication and Authorization with passport.js and express sessions
- [x] Email verification
- [x] Prevention from bots
- [x] Reset password
- [x] Change password
- [x] Filtering blogs

### How to run on your local machine?

Make sure you have node installed on your machine.  
Clone the repository and install the dependenies

```
npm install
```

Rename `.env.example` to `.env`
Add your environmental variables in `.env` file

```
MONGO_URI - obtained from Mongodb atlas or put uri of your local mongo server
SENDGRID_API_KEY - obtained from sendgrid
SENDGRID_FROM - registered email at sendgrid
DOMAIN_URL - your localhost port eg. http://localhost:8000
GOOGLE_RECAPTCHA_SECRET - obtained from the Google recaptcha v2
SESSION_SECRET - a random string (Eg. 'randomsecret')
```

Run the project

```
npm run start
```

Format code

```
npm run format
```

### Project Structure

_(Follows the MVC Architecture)_

```
├── config
│   ├── database.js
│   └── passport.js
├── controllers
│   ├── auth
│   │   └── auth.js
│   ├── blogs
│   │   └── blogs.js
│   ├── forget
│   │   └── forget.js
│   ├── profile
│   │   └── profile.js
│   ├── reset
│   │   └── reset.js
│   └── verify
│       └── verify.js
├── index.js
├── middlewares
│   ├── auth.js
│   └── ratelimiter.js
├── models
│   ├── Blog.js
│   ├── Token.js
│   └── User.js
├── package.json
├── package-lock.json
├── public
│   ├── css
│   │   └── style.css
│   └── js
│       └── app.js
├── README.md
├── routes
│   ├── auth.js
│   ├── blogs.js
│   ├── forget.js
│   ├── index.js
│   ├── profile.js
│   ├── reset.js
│   └── verify.js
├── services
│   └── sendgrid.js
├── utils
│   └── date.js
├── validators
│   └── validators.js
└── views
    ├── auth
    │   ├── login.ejs
    │   └── register.ejs
    ├── blogs
    │   ├── add.ejs
    │   ├── blog.ejs
    │   ├── blogs.ejs
    │   └── edit.ejs
    ├── errors
    │   └── 404.ejs
    ├── forget
    │   └── forget.ejs
    ├── index.ejs
    ├── partials
    │   ├── footer.ejs
    │   ├── header.ejs
    │   ├── messages.ejs
    │   └── navbar.ejs
    ├── profile
    │   ├── changepassword.ejs
    │   └── profile.ejs
    └── reset
        └── reset.ejs
```

### Contributing 💜

If you find any bug or security flaws, feel free to raise an issue or make a pull request.
