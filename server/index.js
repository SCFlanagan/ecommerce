const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const reviewsRoutes = require('./routes/reviews');
const productsRoutes = require('./routes/products');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');

const PORT = 3000;

app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/auth', authRoutes);


/*
app.use(
    '/api/users/:userId/reviews',
    loginRequired,
    ensureCorrectUser,
    reviewsRoutes);
app.use('/api/reviews', reviewsroutes);

app.get('/api/reviews', loginRequired, async function (req, res, next) {
    try {
        let messages = await db.Message.find()
            .sort({ createdAt: 'desc' })
            .populate('user', {
                username: true,
                profileImageUrl: true
            });
        return res.status(200).json(messages);
    } catch (err) {
        return next(err);
    }
}); */

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function () {
    console.log(`Server is starting on port ${PORT}`);
});

module.exports = app;