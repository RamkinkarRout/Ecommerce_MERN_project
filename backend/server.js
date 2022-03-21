const app = require("./app");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

//hnadling uncaught exception

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION", err.name, err.message);
  console.log("shutting down...");
  process.exit(1);
});

//config

dotenv.config({ path: "backend/config/config.env" });

//connect to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT} } `
  );
});

//unhandeled event error
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err.message);
  console.log("shutting down...");
  process.exit(1);
});
