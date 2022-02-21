const app = require('../index');
const db = require('../models');
const request = require('supertest');
const mongoose = require('mongoose');

let userId;

describe('user routes', () => {

    beforeAll(async () => {
        const dummyUser = await db.User.create({
            username: 'dummyuser',
            email: 'dummy3@email.com',
            password: 'password'
        });
        userId = dummyUser._id;
    });

    afterAll(async () => {
        let userIdMon = mongoose.Types.ObjectId(userId);
        const user = await db.User.findById(userIdMon);
        if (user) await user.remove();
    });

    describe('/api/users/:userId', () => {
        test('get a single user', async () => {
            let response = await request(app)
                .get(`/api/users/${userId}`);
            expect(response.status).toEqual(200);
            expect(Array.isArray(response.body.shoppingCart)).toBeTruthy();
        });

        test('delete a user', async () => {
            let response = await request(app)
                .delete(`/api/users/${userId}`);
            expect(response.status).toEqual(200);
            let user = await db.User.findById(userId);
            expect(user).toBeNull();
        });
    });

});