//Creating token and saving inside Cookies

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  //options for cookie
  const options = {
    expires: new Date(
      Date.now() +
        process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      status: "success",
      user,
      token,
    });
};

module.exports = sendToken;
