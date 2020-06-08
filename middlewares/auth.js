module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) next();
        res.redirect('/users/login');
    },
    forwardAuthenticated: (req, res, next) => {
        /*
         * If the user is not authenticated then next()
         * If the user is Authenticated send him to /blogs 
         */
        if (!req.isAuthenticated()) next();
        res.redirect('/blogs');
    }
}