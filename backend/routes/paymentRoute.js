const express = require("express");
const {
  processPayment,
  sendStripePublicKey,
} = require("../controller/paymentController");
const router = express.Router();
const {
  isAuthenticatedUser,
} = require("../middleware/auth");

router
  .route("/payment/process")
  .post(isAuthenticatedUser, processPayment);

router
  .route("/stripePublicKey")
  .get(isAuthenticatedUser, sendStripePublicKey);

module.exports = router;
