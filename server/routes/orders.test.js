const app = require('../index');
const db = require('../models');
const request = require('supertest');
const { createDummyUser, deleteDummy } = require('../handlers/tests');

let userId;
let orderId;

describe('order routes', () => {
    beforeAll(async () => {
        const dummyUser = await createDummyUser('orderRoute');
        userId = dummyUser.id;
    });

    afterAll(async () => {
        await deleteDummy(userId, 'User');
        await deleteDummy(orderId, 'Order');
    });

    describe('/api/users/:userId/orders', () => {
        test('get all orders of current user', async () => {
            let response = await request(app)
                .get(`/api/users/${userId}/orders`);
            expect(response.status).toEqual(200);
            expect(Array.isArray(response.body)).toBeTruthy();
        });

        test('create a new order for current user', async () => {
            let response = await request(app)
                .post(`/api/users/${userId}/orders`)
                .send({
                    user: userId,
                    items: {
                        product: '6211c34aff0b2323a20beac6',
                        quantity: 2,
                    },
                    total: 40,
                    status: 'pending'
                });
            orderId = response.body._id;
            expect(response.status).toEqual(201);
            expect(response.body.user).toEqual(userId);
            expect(response.body.items[0].quantity).toEqual(2);
            expect(response.body.total).toEqual(40);
        });
    });

    describe('/api/users/:userId/orders/:orderId', () => {
        test('get a single order', async () => {
            let response = await request(app)
                .get(`/api/users/${userId}/orders/${orderId}`);
            expect(response.status).toEqual(200);
            expect(response.body._id).toEqual(orderId);
            expect(response.body.total).toEqual(40);
        });

        test('update an order', async () => {
            let response = await request(app)
                .put(`/api/users/${userId}/orders/${orderId}`)
                .send({
                    status: 'completed'
                });
            expect(response.status).toEqual(200);
            expect(response.body.status).toEqual('completed');
        });

        test('delete an order', async () => {
            let response = await request(app)
                .delete(`/api/users/${userId}/orders/${orderId}`);
            expect(response.status).toEqual(200);
            expect(response.body._id).toEqual(orderId);
        });
    });

});