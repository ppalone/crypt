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

module.exports = {
  registerValidations,
};
