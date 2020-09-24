# Crypt

㊙ A secret & secure place where you only can view your blogs 📝

### Features 🍰

- [x] Secure Authentication and Authorization with passport.js and express sessions
- [x] Email verification
- [x] Prevention from bots
- [ ] Reset password
- [ ] Change password
- [ ] Filtering blogs

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
SENDGRID_API - obtained from sendgrid
SENDGRID_FROM - registered email at sendgrid
DOMAIN_URL - your localhost port eg. http://localhost:8000
GOOGLE_RECAPTCHA_SECRET - obtained from the Google recaptcha v2
```

Run the project

```
npm run start
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
│   └── users
│       ├── login.js
│       ├── logout.js
│       ├── password.js
│       └── register.js
├── index.js
├── middlewares
│   └── auth.js
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
│   ├── blogs.js
│   ├── profile.js
│   ├── users.js
│   └── verify.js
├── services
│   └── sendgrid.js
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
    │   └── profile.ejs
    └── users
        ├── forget.ejs
        ├── login.ejs
        ├── partials
        │   └── messages.ejs
        └── register.ejs
```

### Contributing 💜

If you find any bug or security flaws, feel free to raise an issue or make a pull request.
