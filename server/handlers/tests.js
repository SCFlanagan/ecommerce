const db = require('../models');
const mongoose = require('mongoose');

exports.createDummyUser = async (email) => {
    return await db.User.create({
        username: 'dummyuser',
        email: `${email}@email.com`,
        password: 'password'
    });
}

exports.createDummyProduct = async (price) => {
    return await db.Product.create({
        productName: 'Sunglasses',
        price: 50,
        description: 'Dark lenses',
        quantity: 100
    });
}

exports.deleteDummy = async (id, Model) => {
    const monId = mongoose.Types.ObjectId(id);
    const found = await db[Model].findById(monId);
    if (found) await found.deleteOne();
}