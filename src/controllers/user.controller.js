const userService = require("../services/user.service");

function createUser(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Invalid user data" });
  }

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required",
    });
  }

  if (!email.endsWith("@gmail.com")) {
    return res
      .status(400)
      .json({ message: "Only @gmail.com emails are allowed" });
  }

  const existingUser = userService.findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: "User or email already exists" });
  }

  const user = userService.createUser({
    name,
    email,
    role: "USER",
  });

  return res.status(201).json(user);
}

function createAdmin(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Invalid admin data" });
  }

  const existingUser = userService.findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: "Admin already exists" });
  }

  const admin = userService.createUser({
    name,
    email,
    role: "ADMIN",
  });

  return res.status(201).json(admin);
}

function listUsers(req, res) {
  const users = userService.listUsers();
  return res.json(users);
}

module.exports = {
  createUser,
  createAdmin,
  listUsers,
};
