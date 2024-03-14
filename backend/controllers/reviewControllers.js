const catchAsyncErrors = require("../middlewares/catchAsyncError");
const movieModels = require("../models/movieModels");
const ErrorHandler = require("../utils/errorHandler");

const addReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const movie = await movieModels.findById(req.params.id);

  const isReviewed = movie.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    movie.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    movie.reviews.push(review);
    movie.numberOfReviews = movie.reviews.length;
  }

  let average = 0;
  movie.reviews.forEach((rev) => {
    average += rev.rating;
  });

  movie.movieAverageRating = average / movie.reviews.length;

  await movie.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "review added",
  });
});

const updateReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment } = req.body;
  const movie = await movieModels.findById(req.params.movieId);

  if (!movie) {
    return next(new ErrorHandler("movie Not Found with movieId", 404));
  }

  const reviewObj = movie.reviews.find(
    (rev) => rev._id.toString() === req.params.reviewId.toString()
  );

  if (!reviewObj) {
    return next(new ErrorHandler("review Not Found with reviewId", 404));
  }

  if (reviewObj.user.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler(
        "user does not have access to modify other user's review",
        401
      )
    );
  }

  reviewObj.rating = rating;
  reviewObj.comment = comment;

  let average = 0;
  movie.reviews.forEach((rev) => {
    average += rev.rating;
  });

  movie.movieAverageRating = average / movie.reviews.length;

  await movie.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "review updated",
  });
});

const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const movie = await movieModels.findById(req.params.movieId);

  if (!movie) {
    return next(new ErrorHandler("movie Not Found with movieId", 404));
  }

  const reviewObj = movie.reviews.find(
    (rev) => rev._id.toString() === req.params.reviewId.toString()
  );

  if (reviewObj.user.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler(
        "user does not have access to modify other user's review",
        401
      )
    );
  }

  if (!reviewObj) {
    return next(new ErrorHandler("review Not Found with reviewId", 404));
  }

  const reviews = movie.reviews.filter((rev) => {
    rev._id.toString() !== req.params.reviewId.toString();
  });

  let average = 0;
  reviews.forEach((rev) => {
    average += rev.rating;
  });

  const movieAverageRating =
    reviews.length === 0 ? 0 : average / reviews.length;

  const numberOfReviews = reviews.length;

  await movieModels.findByIdAndUpdate(
    req.params.movieId,
    {
      numberOfReviews,
      movieAverageRating,
      reviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "review deleted",
  });
});

const getAllReviews = catchAsyncErrors(async (req, res) => {
  const movie = await movieModels.findById(req.params.id);

  if (!movie) {
    return next(new ErrorHandler("movie Not Found with movieId", 404));
  }

  res.status(200).json({
    success: true,
    reviews: movie.reviews,
  });
});

const getMovieAverageRating = catchAsyncErrors(async (req, res) => {
  const movie = await movieModels.findById(req.params.id);

  if (!movie) {
    return next(new ErrorHandler("movie Not Found with movieId", 404));
  }

  res.status(200).json({
    success: true,
    movieAverageRating: movie.movieAverageRating,
  });
});

module.exports = {
  addReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getMovieAverageRating,
};
