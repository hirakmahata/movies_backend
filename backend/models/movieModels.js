const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter movie title"],
    trim: true,
  },
  director: {
    type: String,
    required: [true, "please enter movie director name"],
    trim: true,
  },
  genre: {
    type: String,
    required: [true, "please enter movie genre"],
    trim: true,
  },
  releaseYear: {
    type: Number,
    required: [true, "please enter movie releaseYear"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please enter movie description"],
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  movieAverageRating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: [true, "please enter your name"],
      },
      rating: {
        type: Number,
        default: 0,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  numberOfReviews: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
