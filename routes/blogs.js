const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/auth').ensureAuthenticated;

router.use(ensureAuthenticated);

router
    .get('/blogs', (req, res) => res.render('blogs/blogs'));
    // .post('/blogs', (req, res) => res.send('Post request to /blogs'));

module.exports = router;