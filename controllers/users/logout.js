module.exports = {
    logoutUser: (req, res) => {
        req.logout();
        res.redirect('/users/login');
    }
}