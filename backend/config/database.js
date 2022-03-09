const { default: mongoose } = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(
        `Connected to database with ${data.connections[0].name}`
      );
    });
};

module.exports = connectDatabase;
