const ErrorHander = require("../utils/errorhander.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//Regiser user
exports.registerUser = catchAsyncError(
  async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(
      req.body.avatar,
      {
        folder: "avatars",
        width: 300,
        height: 300,
        crop: "fill",
      }
    );

    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
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

//forgot password

exports.forgotPassword = catchAsyncError(
  async (req, res, next) => {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return next(
        new ErrorHander(
          "User with that email does not exist",
          404
        )
      );
    }

    //get reset password token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    //create reset url
    // const resetUrl = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/version1/password/reset/${resetToken}`;

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Store.io password recovery",
        message,
        success: true,
      });

      res.status(200).json({
        status: "success",
        message: `Email sent to ${user.email} with password reset link`,
      });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorHander(err.message, 500));
    }
  }
);

//reset password
exports.resetPassword = catchAsyncError(
  async (req, res, next) => {
    //get hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrorHander(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(
        new ErrorHander("Password does not password", 400)
      );
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
  }
);

//get user details

exports.getUSerDetails = catchAsyncError(
  async (req, res, next) => {
    const user = await User.findById(req.user.id).select(
      "-password"
    );

    res.status(200).json({
      status: "success",
      user,
    });
  }
);

//update user password

exports.updateUserPassword = catchAsyncError(
  async (req, res, next) => {
    const user = await User.findById(req.user.id).select(
      "+password"
    );

    const isPasswordMatched = await user.comparePassword(
      req.body.oldPassword
    );

    if (!isPasswordMatched) {
      return next(
        new ErrorHander("Old password is incorrect", 400)
      );
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(
        new ErrorHander("password does not match", 400)
      );
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
  }
);

//update user Profile

exports.updateUserProfile = catchAsyncError(
  async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(
        req.body.avatar,
        {
          folder: "avatars",
          width: 300,
          height: 300,
          crop: "fill",
        }
      );

      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      newUserData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      user,
    });
  }
);
//get all users(admin)

exports.getAllUser = catchAsyncError(
  async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      users,
    });
  }
);

//get single users(admin)

exports.getSingleUser = catchAsyncError(
  async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHander(
          `User with that id does not exist ${req.params.id} `,
          404
        )
      );
    }
    res.status(200).json({
      status: "success",
      user,
    });
  }
);

//update user Role admin

exports.updateUserRole = catchAsyncError(
  async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return next(
        new ErrorHander(
          `User with that id does not exist ${req.params.id} `,
          404
        )
      );
    }
    res.status(200).json({
      status: "success",
      user,
    });
  }
);

//Delete user admin

exports.deleteUser = catchAsyncError(
  async (req, res, next) => {
    const user = await User.findByIdAndDelete(
      req.params.id
    );

    if (!user) {
      return next(
        new ErrorHander(
          `User with that id does not exist ${req.params.id} `,
          404
        )
      );
    }
    res.status(200).json({
      status: "success",
      message: "User deleted",
      user,
    });
  }
);
