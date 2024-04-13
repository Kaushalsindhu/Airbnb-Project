const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapasync.js");
const {isLoggedIn, isReviewAuthor, validateReview} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//REVIEWS
//POST REVIEW ROUTE
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//DELETE REVIEW ROUTE
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;