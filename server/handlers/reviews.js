const db = require('../models');

// POST - /api/users/:userId/products/:productId
exports.createReview = async function (req, res, next) {
    try {
        let review = await db.Review.create({
            rating: req.body.rating,
            reviewContent: req.body.reviewContent,
            user: req.params.userId
        });
        let foundUser = await db.User.findById(req.params.userId);
        foundUser.reviews.push(review.id);
        await foundUser.save();
        let foundReview = await db.Review.findById(review._id)
            .populate('user', {
                username: true,
                profileImageUrl: true
            })
            .populate('product', {
                name: true,
                productImageUrl: true
            });
        return res.status(200).json(foundReview)
    } catch (err) {
        return next(err);
    }
}

// GET      /api/users/:userId/reviews
exports.getReviews = async function (req, res, next) {
    try {
        const reviews = await db.Review.find({ user: req.params.userId });
        return res.status(200).json(reviews);
    } catch (err) {
        return next(err);
    }
}

// GET      /api/users/:userId/reviews/:reviewId
exports.getReview = async function (req, res, next) {
    try {
        const review = await db.Review.find(req.params.reviewId);
        return res.status(200).json(review);
    } catch (err) {
        return next(err);
    }
}

// DELETE   /api/users/:userId/reviews
exports.deleteReview = async function (req, res, next) {
    try {
        let foundReview = await db.Review.findById(req.params.reviewId);
        await foundReview.remove();
        return res.status(200).json(foundReview);
    } catch (err) {
        return next(err);
    }
}