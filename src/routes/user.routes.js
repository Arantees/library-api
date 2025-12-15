const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const { authenticate, onlyAdmin } = require("../middlewares/auth.middleware");

router.post("/users", userController.createUser);

router.post(
  "/admin/users",
  authenticate,
  onlyAdmin,
  userController.createAdmin
);

module.exports = router;
