const mongoose = require('mongoose');
const User = require('./user');
const Product = require('./product');

const reviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        reviewContent: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    },
    {
        timestamps: true
    }
);

// Delete from user review array ??? !!!  
reviewSchema.pre('remove', async function (next) {
    try {
        let user = await User.findById(this.user);
        user.reviews.remove(this.id);
        await user.save()
    } catch (err) {
        return next(err);
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;