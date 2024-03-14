const express = require("express");

const router = express.Router();

const {
  addReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getMovieAverageRating,
} = require("../controllers/reviewControllers");
const isAuthenticatedUser = require("../middlewares/auth");

router
  .route("/:id/reviews")
  .post(isAuthenticatedUser, addReview)
  .get(getAllReviews);
router
  .route("/:movieId/reviews/:reviewId")
  .put(isAuthenticatedUser, updateReview)
  .delete(isAuthenticatedUser, deleteReview);

router.route("/:id/averageRating").get(getMovieAverageRating);

module.exports = router;
