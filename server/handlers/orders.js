const db = require('../models');

// GET  /api/users/:userId/orders
// Gets all orders for current user
exports.getOrders = async function (req, res, next) {
    try {
        const orders = await db.Order.find({ user: req.params.userId })
            .sort({ createdAt: 'desc' })
            .populate('items.product', {
                productName: true,
                productImageUrl: true
            });
        return res.status(200).json(orders);
    } catch (err) {
        return next(err);
    }
}

// POST  /api/users/:userId/orders
// Creates a new order
module.exports.createOrder = async function (req, res, next) {
    try {
        const newOrder = await db.Order.create(req.body);
        const foundOrder = await db.Order.findById(newOrder.id)
            .populate('items.product', {
                productName: true,
                quantity: true
            });

        let foundUser = await db.User.findById(req.params.userId);
        foundUser.orders.push(newOrder.id);
        await foundUser.save();

        return res.status(201).json(foundOrder)
    } catch (err) {
        return next(err);
    }
}

// GET /api/users/:userId/orders/:orderId
// Gets a single order for current user
module.exports.getOrder = async function (req, res, next) {
    try {
        const order = await db.Order.findById(req.params.orderId)
            .populate('items.product', {
                productName: true,
                productImageUrl: true
            });
        return res.status(200).json(order);
    } catch (err) {
        return next(err);
    }
}

// ONLY ADMIN FUNCTIONALITY

// PUT /api/users/:userId/orders/:orderId
// Update an order
module.exports.updateOrder = async function (req, res, next) {
    try {
        const foundOrder = await db.Order.findOneAndUpdate({ _id: req.params.orderId }, req.body);
        const updatedOrder = await db.Order.findById(foundOrder.id);
        res.status(200).send(updatedOrder);
    } catch (err) {
        return next(err);
    }
}

// DELETE / api/users/:userId/orders/:orderId
// Delete an order
module.exports.deleteOrder = async function (req, res, next) {
    try {
        let order = await db.Order.findById(req.params.orderId);
        await order.deleteOne();
        return res.status(200).json(order);
    } catch (err) {
        return next(err);
    }
}
