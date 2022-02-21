const app = require('../index');
const request = require('supertest');
const db = require('../models');
const { createDummyUser, createDummyProduct, deleteDummy } = require('../handlers/tests');

let userId;
let reviewId;
let productId;

describe('reviews routes', () => {

    beforeAll(async () => {
        const dummyUser = await createDummyUser('reviewRoute');
        userId = dummyUser.id;

        const dummyProduct = await createDummyProduct();
        productId = dummyProduct.id;
    });

    afterAll(async () => {
        await deleteDummy(userId, 'User');
        await deleteDummy(reviewId, 'Review');
        await deleteDummy(productId, 'Product');
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
                .post(`/api/users/${userId}/reviews/${productId}`)
                .send({
                    product: productId,
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