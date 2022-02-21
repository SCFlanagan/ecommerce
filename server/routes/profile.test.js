const app = require('../index');
const db = require('../models');
const request = require('supertest');
const mongoose = require('mongoose');

let userId;
let profileId;

describe('profile routes', () => {
    beforeAll(async () => {
        const dummyUser = await db.User.create({
            username: 'dummyuser',
            email: 'dummy2@email.com',
            password: 'password'
        });
        userId = dummyUser.id;
    });

    afterAll(async () => {
        let userIdMon = mongoose.Types.ObjectId(userId);
        const user = await db.User.findById(userIdMon);
        if (user) await user.remove();


        let profileIdMon = mongoose.Types.ObjectId(profileId);
        const profile = await db.Profile.findById(profileIdMon);
        if (profile) await profile.remove();
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