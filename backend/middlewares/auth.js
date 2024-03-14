const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const UserModel = require("../models/userModels");
const jwt = require("jsonwebtoken");

//authenticating user whether logged in or not
const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await UserModel.findById(decodedData.id);

  next();
});

module.exports = isAuthenticatedUser;
