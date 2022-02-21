const app = require('../index');
const db = require('../models');
const request = require('supertest');
const { createDummyUser, deleteDummy } = require('../handlers/tests');

let userId;

describe('user routes', () => {

    beforeAll(async () => {
        const dummyUser = await createDummyUser('userRoute');
        userId = dummyUser._id;
    });

    afterAll(async () => {
        await deleteDummy(userId, 'User');
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