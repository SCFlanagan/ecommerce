const app = require('../index');
const db = require('../models');
const mongoose = require('mongoose');
const request = require('supertest');

let productId;

describe('product routes', () => {

    afterAll(async () => {
        let productIdMon = mongoose.Types.ObjectId(productId);
        const product = await db.Product.findById(productIdMon);
        if (product) await product.deleteOne();
    });

    describe('/api/products', () => {
        test('create a new product', async () => {
            let response = await request(app)
                .post('/api/products')
                .send({
                    productName: 'Shoes',
                    price: 60,
                    quantity: 400
                });
            productId = response.body._id;
            expect(response.status).toEqual(201);
            expect(response.body.productName).toEqual('Shoes');
            expect(response.body.price).toEqual(60);
            expect(response.body.quantity).toEqual(400);
        });

        test('get all products', async () => {
            let response = await request(app)
                .get('/api/products');
            expect(response.status).toEqual(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body[0].productName).toEqual('Shoes');
        });
    });

    describe('/api/products/:productId', () => {
        test('get a single product', async () => {
            let response = await request(app)
                .get(`/api/products/${productId}`);
            expect(response.status).toEqual(200);
            expect(response.body._id).toEqual(productId);
            expect(response.body.productName).toEqual('Shoes');
        });

        test('edit a product', async () => {
            let response = await request(app)
                .put(`/api/products/${productId}`)
                .send({
                    price: 20
                });
            expect(response.status).toEqual(200);
            expect(response.body.price).toEqual(20);
        });

        test('delete a product', async () => {
            let response = await request(app)
                .delete(`/api/products/${productId}`);
            expect(response.status).toEqual(200);
            expect(response.body._id).toEqual(productId);
        });
    });

});