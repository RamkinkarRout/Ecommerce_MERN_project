const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

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

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!decodedToken) {
      return next(
        new ErrorHander("You are not logged in", 401)
      );
    }

    req.user = await User.findById(decodedToken.id);
    next();
  }
);

//admin role check
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          "You are not authorized to perform this action",
          403
        )
      );
    }
    next();
  };
};
