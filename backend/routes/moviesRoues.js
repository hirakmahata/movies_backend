const express = require("express");

const router = express.Router();

const {
  createNewMovie,
  updateMovie,
  deleteMovie,
  getMovieDetails,
  getAllMovies,
} = require("../controllers/moviesControllers");
const isAuthenticatedUser = require("../middlewares/auth");

router.route("/").post(isAuthenticatedUser, createNewMovie).get(getAllMovies);
router
  .route("/:id")
  .put(isAuthenticatedUser, updateMovie)
  .delete(isAuthenticatedUser, deleteMovie)
  .get(getMovieDetails);

module.exports = router;
