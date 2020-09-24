module.exports = {
  logoutUser: (req, res) => {
    req.flash("success_mss", "Logged out successfully!");
    req.logout();
    res.redirect("/users/login");
  },
};
