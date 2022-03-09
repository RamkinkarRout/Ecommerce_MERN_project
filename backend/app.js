const express = require("express");
const app = express();
const errormiddleware = require("./middleware/error");
app.use(express.json());

//route imports

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/version1", product);
app.use("/api/version1/", user);

//middleware for error handling
app.use(errormiddleware);

module.exports = app;
