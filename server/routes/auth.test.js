const app = require('../index');
const db = require('../models');
const request = require('supertest');
const mongoose = require('mongoose');

let userId;

describe('auth routes', () => {

    afterAll(async () => {
        let userIdMon = mongoose.Types.ObjectId(userId);
        const user = await db.User.findById(userIdMon);
        if (user) await user.deleteOne();
    });

    describe('/api/auth/signup', () => {
        test('signup a user', async () => {
            let response = await request(app)
                .post('/api/auth/signup')
                .send({
                    username: 'dummyuser',
                    email: 'dummy@email.com',
                    password: 'password'
                });
            userId = response.body.id;
            expect(response.status).toEqual(201);
            expect(response.body.username).toEqual('dummyuser');
        });
    });

    describe('/api/auth/signin', () => {
        test('signin a user', async () => {
            let response = await request(app)
                .post('/api/auth/signin')
                .send({
                    email: 'dummy@email.com',
                    password: 'password'
                });
            expect(response.status).toEqual(200);
            expect(response.body.username).toEqual('dummyuser');
        });
    });

});