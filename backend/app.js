const express = require("express");
const cookieParser = require("cookie-parser");
const errMiddleware = require("./middlewares/error");

const app = express();

app.use(express.json());
app.use(cookieParser());

const userRouter = require("./routes/userRoutes");
const moviesRouter = require("./routes/moviesRoues");
const reviewRouter = require("./routes/reviewRoutes");

app.use("/api/users", userRouter);

app.use("/api/movies", moviesRouter);

app.use("/api/movies", reviewRouter);

app.use(errMiddleware);

module.exports = app;
