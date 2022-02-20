const mongoose = require('mongoose');

const favoriteListSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        items: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: Number
        }]
    },
    {
        timestamps: true
    }
);

const FavoriteList = mongoose.model('FavoriteList', favoriteListSchema);
module.exports = FavoriteList;