const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { loginUser } = require('../../controller/user');

// @route  POST api/users
// @desc   Login user
// @access Public
router.post(
  '/',
  [
    check('username', 'Please include a valid username').notEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  loginUser
);

module.exports = router;
