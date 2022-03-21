const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errormiddleware = require("./middleware/error");
const fileUpload = require("express-fileupload");

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true })
);
// app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//route imports

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/version1", product);
app.use("/api/version1/", user);
app.use("/api/version1/", order);

//middleware for error handling
app.use(errormiddleware);

module.exports = app;
