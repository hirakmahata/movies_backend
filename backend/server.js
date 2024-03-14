const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Uncaught Exception
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.error("shutting down the server due to Uncaught Exception");
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  console.error("shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
