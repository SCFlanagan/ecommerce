const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number
        }],
        total: Number,
        // Payment and Billing Information !!!
        // Shipping information !!!
        status: String
    },
    {
        timestamps: true
    }
);

//  Need a method that connects profile to user on creation !!!

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;