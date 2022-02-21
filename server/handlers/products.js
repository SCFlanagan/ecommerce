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
        let foundProduct = await db.Product.findById(newProduct.id)
            .populate('reviews');
        return res.status(201).json(foundProduct)
    } catch (err) {
        return next(err);
    }
}

// GET  /api/products/:productId
exports.getProduct = async function (req, res, next) {
    try {
        const product = await db.Product.findById(req.params.productId)
            .populate('reviews', {
                rating: true,
                reviewContent: true,
                user: true
            });
        return res.status(200).json(product);
    } catch (err) {
        return next(err);
    }
}

// PUT - /api/products/:productId
exports.updateProduct = async function (req, res, next) {
    try {
        const foundProduct = await db.Product.findOneAndUpdate({ _id: req.params.productId }, req.body);
        const updatedProduct = await db.Product.findById(foundProduct.id);
        res.status(200).send(updatedProduct);
    } catch (err) {
        return next(err);
    }
}

// DELETE   /api/products/:productId
// Only allow this if user is an admin ??? !!!
exports.deleteProduct = async function (req, res, next) {
    try {
        let product = await db.Product.findById(req.params.productId);
        product.deleteOne();
        return res.status(200).json(product);
    } catch (err) {
        return next(err);
    }
}