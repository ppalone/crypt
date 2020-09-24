const router = require("express").Router();
const loginController = require("../controllers/users/login");
const registerController = require("../controllers/users/register");
const logoutController = require("../controllers/users/logout");
const passwordController = require("../controllers/users/password");
const authMiddleware = require("../middlewares/auth");
const ensureAuthenticated = authMiddleware.ensureAuthenticated;
const forwardAuthenticated = authMiddleware.forwardAuthenticated;

// Don't call the function like forwardAuthenticated()

router
  .get("/login", forwardAuthenticated, loginController.getLoginForm)
  .post("/login", loginController.checkLoginCredentials)

  .get("/register", forwardAuthenticated, registerController.getRegisterForm)
  .post("/register", registerController.registerUser)

  .get("/logout", ensureAuthenticated, logoutController.logoutUser)
  .get("/forget", forwardAuthenticated, passwordController.getForgetFrom)
  .post("/forget", passwordController.sendForgetToken);

module.exports = router;
