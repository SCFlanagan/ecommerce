const db = require('../models');

// POST - /api/users/:userId/
exports.getUser = async function (req, res, next) {
    try {
        const user = await db.User.findById(req.params.userId)
            // Populate with all of these ??? !!!
            .populate('profile')
            .populate('reviews')
            .populate('shoppingCart')
            .populate('favoriteList')
            .populate('orders');
        return res.status(200).json(user)
    } catch (err) {
        return next(err);
    }
}

// PUT - /api/users/:userId
exports.deleteUser = async function (req, res, next) {
    try {
        const user = await db.User.findById(req.params.userId);
        await user.deleteOne();
        return res.status(200).send(user);
    } catch (err) {
        return next(err);
    }
}