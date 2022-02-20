const express = require('express');
const router = express.Router({ mergeParams: true });
const { createReview, getReview, getReviews, deleteReview } = require('../handlers/reviews');

router.route('/')
    .get(getReviews)
    .post(createReview);

router.route('/:reviewId')
    .get(getReview)
    .delete(deleteReview);

module.exports = router;