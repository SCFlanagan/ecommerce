const express = require('express');
const router = express.Router({ mergeParams: true });
const { createReview, getReview, getReviews, updateReview, deleteReview } = require('../handlers/reviews');

router.route('/')
    .get(getReviews)

router.route('/:productId')
    .post(createReview);

router.route('/:reviewId')
    .get(getReview)
    .put(updateReview)
    .delete(deleteReview);

module.exports = router;