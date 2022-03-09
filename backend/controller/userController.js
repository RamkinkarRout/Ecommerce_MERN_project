const ErrorHander = require("../utils/errorhander.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");

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

    const token = user.getJwtToken();

    res.status(201).json({
      status: "success",
      succress: true,
      token,
    });
  }
);
