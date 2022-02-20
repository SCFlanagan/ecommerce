const db = require('../models');

// GET  /api/users/:userId/orders
// Gets all orders for current user
module.exports.getOrders = async function (req, res, next) {
    try {

    } catch {
        return next(err);
    }
}

// POST  /api/users/:userId/orders
// Creates a new order for current user
module.exports.createOrder = async function (req, res, next) {
    try {

    } catch {
        return next(err);
    }
}

// GET /api/users/:userId/orders/:orderId
// Gets a single order for current user
module.exports.getOrder = async function (req, res, next) {
    try {

    } catch {
        return next(err);
    }
}


// ONLY ADMIN FUNCTIONALITY

// PUT /api/users/:userId/orders/:orderId
// Update an order
module.exports.updateOrder = async function (req, res, next) {
    try {

    } catch {
        return next(err);
    }
}

// DELETE / api/users/:userId/orders/:orderId
// Delete an order
module.exports.deleteOrder = async function (req, res, next) {
    try {

    } catch {
        return next(err);
    }
}
