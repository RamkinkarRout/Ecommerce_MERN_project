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

  //mongodb duplicate key error --> email already exist

  if (err.code === 11000) {
    err = new ErrorHander(
      `Resource already exist with email of ${err.keyValue}`,
      400
    );
  }

  //mongodb validation error --> email already exist

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(
      (val) => val.message
    );
    err = new ErrorHander(messages, 400);
  }

  //jasonwebtoken error --> token not provided

  if (err.name === "JsonWebTokenError") {
    err = new ErrorHander(
      "Invalid token. Please login again",
      401
    );
  }

  //jasonwebtoken error --> token expired

  if (err.name === "TokenExpiredError") {
    err = new ErrorHander(
      "Token expired. Please login again",
      401
    );
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err.statusCode,
  });
};
