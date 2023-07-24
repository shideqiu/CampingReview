const Campground = require("../models/campground");
const Review = require("../models/review");
const reviews = require("../controllers/reviews")
const express = require("express");
const router = express.Router({ mergeParams: true });
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')

// Add a review
router.post('/', isLoggedIn, validateReview, reviews.createReview)

// Delete a review
router.post('/:reviewId/delete', isLoggedIn, isReviewAuthor, reviews.deleteReview)

module.exports = router;