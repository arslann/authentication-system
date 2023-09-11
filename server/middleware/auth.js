var jwt = require('jsonwebtoken');

const JWT_TOKEN = '123';

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authrozition denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_TOKEN);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is invalid' });
  }
};
