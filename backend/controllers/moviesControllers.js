const movieModel = require("../models/movieModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

const createNewMovie = catchAsyncErrors(async (req, res, next) => {
  const movie = await movieModel.create(req.body);
  res.status(201).json({
    success: true,
    message: "movie created successfully",
    movie,
  });
});

const updateMovie = catchAsyncErrors(async (req, res, next) => {
  let movie = await movieModel.findById(req.params.id);

  if (!movie) {
    return next(new ErrorHandler("movie Not Found", 404));
  }

  movie = await movieModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    movie,
  });
});

const deleteMovie = catchAsyncErrors(async (req, res, next) => {
  const movie = await movieModel.findById(req.params.id);

  if (!movie) {
    return next(new ErrorHandler("Movie Not Found", 404));
  }

  await movie.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: `movie deleted successfully with id: ${req.params.id}`,
  });
});

const getMovieDetails = catchAsyncErrors(async (req, res, next) => {
  const movie = await movieModel.findById(req.params.id);

  if (!movie) {
    return next(new ErrorHandler("Movie Not Found", 404));
  }

  res.status(200).json({
    success: true,
    movie,
  });
});

const getAllMovies = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const totalMovieCount = await movieModel.countDocuments();
  const apiFeatures = new ApiFeatures(movieModel.find(), req.query).filter();
  // .search();
  // .pagination(resultPerPage);

  const allMovies = await apiFeatures.query;

  res.status(200).json({ success: true, allMovies, totalMovieCount });
});

module.exports = {
  createNewMovie,
  updateMovie,
  deleteMovie,
  getMovieDetails,
  getAllMovies,
};
