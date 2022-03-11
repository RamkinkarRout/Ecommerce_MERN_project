const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUSerDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/forgot/password").post(forgotPassword);

router.route("/logout").get(logoutUser);

router.route("/password/reset/:token").put(resetPassword);

router
  .route("/me")
  .get(isAuthenticatedUser, getUSerDetails);

router
  .route("/me/update/password")
  .put(isAuthenticatedUser, updateUserPassword);

router
  .route("/me/update")
  .put(isAuthenticatedUser, updateUserProfile);

router
  .route("/admin/users")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getAllUser
  );

router
  .route("/admin/users/:id")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getSingleUser
  )
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateUserRole
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deleteUser
  );

module.exports = router;
