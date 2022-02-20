const db = require('../models');

// GET  /api/products
exports.getProducts = async function (req, res, next) {
    try {
        const products = await db.Product.find();
        res.status(200).json(products);
    } catch (err) {
        return next(err);
    }
}

// POST - /api/products
exports.createProduct = async function (req, res, next) {
    try {
        const newProduct = await db.Product.create(req.body);
        let foundProduct = await db.Product.findById(newProduct._id)
            .populate('reviews');
        return res.status(200).json(foundProduct)
    } catch (err) {
        return next(err);
    }
}

// GET  /api/products/:productId
exports.getProduct = async function (req, res, next) {
    try {
        const product = await db.Product.findById(req.params.productId)
        return res.status(200).json(product);
    } catch (err) {
        return next(err);
    }
}

// PUT - /api/products/:productId
exports.updateProduct = async function (req, res, next) {
    try {
        await db.Product.findOneAndUpdate({ _id: req.params.productId }, req.body);
        const updatedProduct = await db.Product.findById(req.params.productId);
        res.status(200).send(updatedProduct);
    } catch (err) {
        return next(err);
    }
}

// DELETE   /api/products/:productId
// Only allow this if user is an admin ??? !!!
exports.deleteProduct = async function (req, res, next) {
    try {
        let foundProduct = await db.Product.findById(req.params.productId);
        await foundProduct.remove();
        return res.status(200).json(foundProduct);
    } catch (err) {
        return next(err);
    }
}