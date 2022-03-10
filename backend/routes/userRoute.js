const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
} = require("../controller/userController");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/forgot/password").post(forgotPassword);

router.route("/logout").get(logoutUser);

module.exports = router;
