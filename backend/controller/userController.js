const ErrorHander = require("../utils/errorhander.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken.js");

//Regiser user
exports.registerUser = catchAsyncError(
  async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role,
      avatar: {
        public_id: "sample public id",
        url: "sample url",
      },
    });

    sendToken(user, 201, res);
  }
);

//Login user

exports.loginUser = catchAsyncError(
  async (req, res, next) => {
    const { email, password } = req.body;

    //checking user email and password from user
    if (!email || !password) {
      return next(
        new ErrorHander(
          "Please provide email and password",
          400
        )
      );
    }

    const user = await User.findOne({ email }).select(
      "+password"
    );

    if (!user || !(await user.comparePassword(password))) {
      return next(
        new ErrorHander("Incorrect email or password", 401)
      );
    }

    sendToken(user, 200, res);
  }
);

//logout user
exports.logoutUser = catchAsyncError(
  async (req, res, next) => {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      data: {},
    });
  }
);
