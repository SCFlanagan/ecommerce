const express = require('express');
const router = express.Router({ mergeParams: true });

const { createReview, getReview, deleteReview } = require('../handlers/reviews');

router.route('/').post(createReview);

router
    .route('/:reviewId')
    .get(getReview)
    .delete(deleteReview);

module.exports = router;