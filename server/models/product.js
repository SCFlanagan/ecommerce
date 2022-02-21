const mongoose = require('mongoose');
const db = require('./index');

const imageUrl = 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg';

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: String,
        productImageUrl: {
            type: String,
            default: imageUrl
        },
        quantity: {
            type: Number,
            required: true
        },
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }]
    },
    {
        timestamps: true
    }
);


// Delete from product reviews
// Delete product from shopping carts and favorite lists
/* NOT WORKING !!!
productSchema.pre('remove', async function (next) {
    try {
        let reviews = await db.Review.find({ product: this.id });
        reviews.forEach(review => {
            review.deleteOne();
        });
    } catch (err) {
        return next(err);
    }
}); */

const Product = mongoose.model('Product', productSchema);
module.exports = Product;