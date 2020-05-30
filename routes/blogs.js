const router = require('express').Router();

router
    .get('/blogs', (req, res) => res.send('All Blogs 📄'))
    .post('/blogs', (req, res) => res.send('Post request to /blogs'));

module.exports = router;