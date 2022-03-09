const app = require("./app");

const dotenv = require("dotenv");
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

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}`
  );
});

//unhandeled event error
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err.message);
  console.log("shutting down...");
  process.exit(1);
});
