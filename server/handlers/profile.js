const db = require('../models');

// POST - /api/users/:userId/profile
exports.createProfile = async function (req, res, next) {
    try {
        const newProfile = await db.Profile.create(req.body);
        let foundProfile = await db.Profile.findById(newProfile._id);
        return res.status(200).json(foundProfile)
    } catch (err) {
        return next(err);
    }
}

// PUT - /api/users/:userId/profile
exports.updateProfile = async function (req, res, next) {
    try {
        await db.Profile.findOneAndUpdate({ _id: req.params.userId }, req.body);
        const updatedProduct = await db.Product.findById(req.params.productId);
        res.status(200).send(updatedProduct);
    } catch (err) {
        return next(err);
    }
}