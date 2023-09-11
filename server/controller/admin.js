module.exports.adminTest = async (req, res) => {
  const user = req.user;
  console.log(user);

  if (user.role === 'admin') {
    res.json({ message: 'Welcome to the admin dashboard.' });
  } else {
    res
      .status(403)
      .json({ message: 'Access denied. You do not have the required role.' });
  }
};
