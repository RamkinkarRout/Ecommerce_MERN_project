const catchAsyncError = require("../middleware/catchAsyncError");

const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY
);

exports.processPayment = catchAsyncError(
  async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });

    res.status(200).json({
      status: "success",
      client_secret: myPayment.client_secret,
    });
  }
);

exports.sendStripePublicKey = catchAsyncError(
  async (req, res, next) => {
    res.status(200).json({
      status: "success",
      stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
    });
  }
);
