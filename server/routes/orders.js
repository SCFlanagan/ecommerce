const express = require('express');
const router = express.Router({ mergeParams: true });
const { getOrders, createOrder, getOrder, updateOrder, deleteOrder } = require('../handlers/orders');

router.route('/')
    .get(getOrders)
    .post(createOrder);

router.route('/:orderId')
    .get(getOrder)
    .put(updateOrder)
    .delete(deleteOrder);

module.exports = router;