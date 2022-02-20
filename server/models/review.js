const mongoose = require('mongoose');
const User = require('./user');
const Product = require('./product');

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        reviewContent: String,
    },
    {
        timestamps: true
    }
);

reviewSchema.pre('remove', async function (next) {
    try {
        let user = await User.findById(this.userId);
        user.message.remove(this.id);
        await user.save()
        return next();
    } catch (err) {
        return next(err);
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;