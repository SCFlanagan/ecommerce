const app = require('../index');
const request = require('supertest');
const db = require('../models');
const mongoose = require('mongoose');

let userId;
let reviewId;

describe('reviews routes', () => {

    beforeAll(async () => {
        const dummyUser = await db.User.create({
            username: 'dummyuser',
            email: 'dummy4@email.com',
            password: 'password'
        });
        userId = dummyUser.id;
    });

    afterAll(async () => {
        let userIdMon = mongoose.Types.ObjectId(userId);
        const user = await db.User.findById(userIdMon);
        if (user) await user.deleteOne();

        let reviewIdMon = mongoose.Types.ObjectId(reviewId);
        const review = await db.Review.findById(reviewIdMon);
        if (review) await review.deleteOne();
    });

    describe('/api/users/:userId/reviews', () => {
        test('get all reviews from current user', async () => {
            const response = await request(app)
                .get(`/api/users/${userId}/reviews`);
            expect(response.status).toEqual(200);
            expect(Array.isArray(response.body)).toBeTruthy();
        });

        test('create a new review for current user', async () => {
            const response = await request(app)
                .post(`/api/users/${userId}/reviews`)
                .send({
                    product: '6211c34aff0b2323a20beac6',
                    rating: 5,
                    reviewContent: 'Good product'
                });
            reviewId = response.body._id;
            expect(response.status).toEqual(201);
            expect(response.body.rating).toEqual(5);
            expect(response.body.reviewContent).toEqual('Good product');
        });
    });

    describe('/api/users/:userId/reviews/:reviewId', () => {
        test('get a single review by current user', async () => {
            const response = await request(app)
                .get(`/api/users/${userId}/reviews/${reviewId}`);
            expect(response.status).toEqual(200);
            expect(response.body.rating).toEqual(5);
            expect(response.body.user).toEqual(userId);
        });

        test('edit a review by current user', async () => {
            const response = await request(app)
                .put(`/api/users/${userId}/reviews/${reviewId}`)
                .send({
                    rating: 2
                });
            expect(response.status).toEqual(200);
            expect(response.body.rating).toEqual(2);
        });

        test('delete a review by current user', async () => {
            const response = await request(app)
                .delete(`/api/users/${userId}/reviews/${reviewId}`);
            expect(response.status).toEqual(200);
            const review = await db.Review.findById(reviewId);
            expect(review).toBeNull();
        });
    });

});