# Crypt

㊙ A secret & secure place where you only can view your blogs 📝

### Features 🍰

- [x] Secure Authentication and Authorization with passport.js and express sessions
- [x] Email verification
- [x] Prevention from bots
- [x] Reset password
- [x] Change password
- [x] Filtering blogs
- [ ] Search blogs

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

### Project folder structure 📁

```
.
├── config
│   ├── db.js
│   └── passport.js
├── controllers
│   ├── blogs
│   │   └── blogs.js
│   ├── profile
│   │   └── profile.js
│   └── users
│       ├── login.js
│       ├── logout.js
│       ├── password.js
│       └── register.js
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
│   ├── favicon.ico
│   └── js
│       └── app.js
├── README.md
├── routes
│   ├── blogs.js
│   ├── index.js
│   ├── profile.js
│   ├── users.js
│   └── verify.js
├── services
│   └── sendgrid.js
├── utils
│   └── date.js
└── views
    ├── blogs
    │   ├── add.ejs
    │   ├── blog.ejs
    │   ├── blogs.ejs
    │   └── edit.ejs
    ├── errors
    │   └── 404.ejs
    ├── index.ejs
    ├── partials
    │   ├── footer.ejs
    │   ├── header.ejs
    │   └── navbar.ejs
    ├── profile
    │   ├── changepassword.ejs
    │   └── profile.ejs
    └── users
        ├── forget.ejs
        ├── login.ejs
        ├── partials
        │   └── messages.ejs
        ├── register.ejs
        └── reset.ejs
```

### Contributing 💜

If you find any bug or security flaws, feel free to raise an issue or make a pull request.
