const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Sample users
const users = [
  { id: 1, username: 'admin', password: 'adminpassword', role: 'admin' },
  { id: 2, username: 'user', password: 'userpassword', role: 'user' },
];

const secretKey = '123';

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  // Find the user by username
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res
      .status(401)
      .json({ message: 'Authentication failed. User not found.' });
  }

  // Compare passwords
  if (user.password !== password) {
    return res
      .status(401)
      .json({ message: 'Authentication failed. Incorrect password.' });
  }

  // Generate a JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    secretKey,
    {
      expiresIn: '1h', // Token expires in 1 hour
    }
  );

  res.json({ user, token });
};
