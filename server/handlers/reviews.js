const db = require('../models');

//  POST    /api/users/:userId/reviews
//  Create a new review for a product by the current user
//  Make this so you can only create one review per product ??? !!!
exports.createReview = async function (req, res, next) {
    try {
        let review = await db.Review.create({
            rating: req.body.rating,
            reviewContent: req.body.reviewContent,
            product: req.body.productId,
            user: req.params.userId
        });

        let foundUser = await db.User.findById(req.params.userId);
        foundUser.reviews.push(review.id);
        await foundUser.save();

        // !!!
        /*let foundProduct = await db.Product.findById(req.params.productId);
        foundProduct.reviews.push(review.id);
        await foundProduct.save();*/

        let foundReview = await db.Review.findById(review._id)
            .populate('user', {
                username: true,
                profileImageUrl: true
            })
            .populate('product', {
                productName: true
            });
        return res.status(201).json(foundReview);
    } catch (err) {
        return next(err);
    }
}

//  GET     /api/users/:userId/reviews
//  Get all reviews written by the current user
exports.getReviews = async function (req, res, next) {
    try {
        const reviews = await db.Review.find({ _id: req.params.userId })
            .sort({ createdAt: 'desc' })
            .populate('user', {
                username: true,
                profileImageUrl: true
            })
            .populate('product', {
                productName: true
            });
        return res.status(200).json(reviews);
    } catch (err) {
        return next(err);
    }
}

//  GET     /api/users/:userId/reviews/:reviewId
//  Get a single review by the current user
exports.getReview = async function (req, res, next) {
    try {
        const review = await db.Review.findById(req.params.reviewId);
        return res.status(200).json(review);
    } catch (err) {
        return next(err);
    }
}

//  PUT     /api/users/:userId/reviews/:reviewId
//  Edit a single review by the current user
exports.updateReview = async function (req, res, next) {
    try {
        let foundReview = await db.Review.findOneAndUpdate({ _id: req.params.reviewId }, req.body);
        const updatedReview = await db.Review.findById(foundReview._id);
        return res.status(200).send(updatedReview);
    } catch (err) {
        return next(err);
    }
}

//  DELETE  /api/users/:userId/reviews/:reviewId
//  Delete a single review by the current user
exports.deleteReview = async function (req, res, next) {
    try {
        let review = await db.Review.findById(req.params.reviewId);
        await review.remove();
        return res.status(200).json(review);
    } catch (err) {
        return next(err);
    }
}