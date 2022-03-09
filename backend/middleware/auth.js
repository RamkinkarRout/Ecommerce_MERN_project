const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncError(
  async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      return next(
        new ErrorHander(
          "You are not logged in, please log In",
          401
        )
      );
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!decodedToken) {
      return next(
        new ErrorHander("You are not logged in", 401)
      );
    }

    req.user = decodedToken;
    next();
  }
);
