const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        profileImageUrl: {
            type: String,
            // Get a bunch of avatars and randomize !!!
            default: 'https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
        },
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        },
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }],
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }],
        shoppingCart: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number
        }],
        favoriteList: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        isAdmi: Boolean
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch {
        return next(err);
    }
}

userSchema.methods.addItemToShoppingCart = async function (productId, quantity) {
    let index = this.shoppingCart.indexOf(productId)
    if (index > -1) {
        this.shoppingCart[index].quantity += quantity;
        this.save();
    } else {
        let item = { productId, quantity };
        this.shoppingCart.push(item);
        this.save();
    }
}

userSchema.methods.removeItemFromShoppingList = async function (productId) {
    let index = this.shoppingCart.indexOf(productId);
    if (index > -1) {
        this.shoppingCart[index].remove();
        this.save();
    } else {
        // Indicate that the product wasn't in the shopping cart !!!
    }
}

userSchema.methods.addItemToFavoriteList = async function (productId) {
    let index = this.favoriteList.indexOf(productId)
    if (index > -1) {
        this.favoriteList.splice(index, 1);
        this.favorite.push(productId);
        this.save()
    } else {
        this.favoriteList.push(productId);
        this.save();
    }
}

userSchema.methods.removeItemFromFavoriteList = async function (productId) {
    let index = this.favoriteList.indexOf(productId);
    if (index > -1) {
        this.favoriteList[index].remove();
        this.save();
    } else {
        // Indicate that the product wasn't in the favorite list !!!
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;