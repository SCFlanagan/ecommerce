const express = require('express');
const router = express.Router({ mergeParams: true });
const { getProducts, createProduct, getProduct, updateProduct, deleteProduct } = require('../handlers/products');

router.route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:productId')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;