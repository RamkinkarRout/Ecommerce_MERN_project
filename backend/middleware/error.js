const ErrorHander = require("../utils/errorhander.js");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  err.status = err.status || "error";

  // const error = new ErrorHander(err.message, err.statusCode);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err.statusCode,
  });
};
