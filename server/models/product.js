const mongoose = require('mongoose');

const imageUrl = 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg';

const productSchema = new mongoose.Schema(
    {
        name: {
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

const Product = mongoose.model('Product', productSchema);
module.exports = Product;