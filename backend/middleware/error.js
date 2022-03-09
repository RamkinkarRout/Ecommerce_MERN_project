const ErrorHander = require("../utils/errorhander.js");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  err.status = err.status || "error";

  //mongodb cast error --> id not given

  if (err.name === "CastError") {
    err = new ErrorHander(
      `Resource not found with id of ${err.value}`,
      404
    );
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err.statusCode,
  });
};
