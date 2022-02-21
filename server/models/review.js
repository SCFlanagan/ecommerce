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

// Not working !!! 
// Delete from user review array and product review array
/*
reviewSchema.pre('remove', async function (next) {
    try {
        let user = await User.findById(this.user);
        user.reviews.remove(this.id);
        await user.save();

        let product = await Product.findById(this.product);
        product.reviews.remove(this.id);
        await product.save();
    } catch (err) {
        return next(err);
    }
});
*/

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;