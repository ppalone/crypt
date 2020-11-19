module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash('error_msg', 'You must be logged in to view this resource');
      return res.redirect('/login');
    }
    next();
  },
  forwardAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return res.redirect('/blogs');
    next();
  },
};
