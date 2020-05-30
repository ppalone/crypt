const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

// Routes Handlers
const usersHandler = require('./routes/users');

// Set view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.use('/users', usersHandler);

app.listen(PORT, console.log(`Server started on port ${PORT}`));