const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(
        `mongo connected with mongodb server: ${data.connection.host}`
      );
    })
    .catch((err) => {
      console.error(err.stack);
    });
};

module.exports = connectDatabase;
