const express = require('express');
const db = require('../models');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
        const products = await db.Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', [
    check('name', 'Product name is required.').exists(),
    check('price', 'Price is required.').exists(),
    check('quantity', 'Quantity is required.').exists()
],
    async (req, res) => {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newProduct = await db.Product.create(req.body);
            res.status(201).json(newProduct);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

router.get('/:productId', async (req, res) => {
    try {
        const product = await db.Product.findById(req.params.productId);
        res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.put('/:productId', async (req, res) => {
    try {
        const updatedProduct = await db.Product.findOneAndUpdate({ _id: req.params.productId }, req.body);
        res.status(200).send('Product has been updated.');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:productId', async (req, res) => {
    try {
        await db.Product.deleteOne({ _id: req.params.productId });
        res.status(200).send('Product has been deleted.');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;