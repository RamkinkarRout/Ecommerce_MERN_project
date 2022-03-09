const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errormiddleware = require("./middleware/error");
app.use(express.json());
app.use(cookieParser());

//route imports

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/version1", product);
app.use("/api/version1/", user);

//middleware for error handling
app.use(errormiddleware);

module.exports = app;
