const { body } = require('express-validator');

const registerValidations = () => {
  return [
    body('email').isEmail().withMessage('Please enter a valid Email!'),
    body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must be atleast 8 characters long!'),
  ];
};

const changePasswordValidations = () => {
  return [
    body('newpassword')
      .trim()
      .isLength({ min: 8 })
      .withMessage('New password must be atleast 8 characters long!'),
  ];
};

const resetPasswordValidations = () => {
  return [
    body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Passwords musts atleast be 8 characters long!'),
    body('confirmpassword')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Passwords musts atleast be 8 characters long!'),
  ];
};

const blogValidations = () => {
  return [
    body('title').trim().notEmpty().withMessage('Title cannot be empty!'),
    body('post').trim().notEmpty().withMessage('Post cannot be empty!'),
  ];
};

module.exports = {
  registerValidations,
  changePasswordValidations,
  resetPasswordValidations,
  blogValidations,
};
