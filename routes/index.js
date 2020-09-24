const router = require("express").Router();

// Routes
const forwardAuthenticated = require("../middlewares/auth")
  .forwardAuthenticated;
const usersHandler = require("./users");
const blogsHandler = require("./blogs");
const profileHandler = require("./profile");
const verificationHandler = require("./verify");

router.get("/", forwardAuthenticated, (req, res) => res.render("index.ejs"));
router.use("/users", usersHandler);
router.use("/blogs", blogsHandler);
router.use(profileHandler);
router.use(verificationHandler);

module.exports = router;
