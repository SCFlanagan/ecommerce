const app = require('../index');
const db = require('../models');
const request = require('supertest');
const { createDummyUser, deleteDummy } = require('../handlers/tests');

let userId;
let profileId;

describe('profile routes', () => {
    beforeAll(async () => {
        const dummyUser = await createDummyUser('profileRoute');
        userId = dummyUser.id;
    });

    afterAll(async () => {
        await deleteDummy(userId, 'User');
        await deleteDummy(profileId, 'Profile');
    });

    describe('/api/users/:userId/profile', () => {
        test('create a profile for current user', async () => {
            let response = await request(app)
                .post(`/api/users/${userId}/profile`)
                .send({
                    user: userId,
                    shippingAddress: {
                        address1: '1 Main St.',
                        city: 'Springfield',
                        zipcode: '11111'
                    },
                    birthDate: 'birthday'
                });
            profileId = response.body._id;
            expect(response.status).toEqual(201);
            expect(response.body.user).toEqual(userId);
            expect(response.body.shippingAddress.city).toEqual('Springfield');
        });

        test('edit the profile of current user', async () => {
            let response = await request(app)
                .put(`/api/users/${userId}/profile`)
                .send({
                    birthDate: 'new birthday'
                });
            expect(response.status).toEqual(200);
            expect(response.body.birthDate).toEqual('new birthday');
        });
    });

});