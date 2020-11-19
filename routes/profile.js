const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');
const profileController = require('../controllers/profile/profile');

const validators = require('../validators/validators');

router.use(function (req, res, next) {
  if (req.query._method === 'DELETE' || req.query._method === 'PATCH') {
    req.method = req.query._method;
    req.url = req.path;
  }
  next();
});

router
  .get(
    '/profile',
    authMiddleware.ensureAuthenticated,
    profileController.getProfile,
  )

  .get(
    '/changepassword',
    authMiddleware.ensureAuthenticated,
    profileController.getChangePassword,
  )

  .post(
    '/changepassword',
    authMiddleware.ensureAuthenticated,
    validators.changePasswordValidations(),
    profileController.changePassword,
  )

  .delete(
    '/delete',
    authMiddleware.ensureAuthenticated,
    profileController.deleteProfile,
  );

module.exports = router;
