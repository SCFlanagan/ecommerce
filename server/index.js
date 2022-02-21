require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const reviewsRoutes = require('./routes/reviews');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const { loginRequired, ensureCorrectUser, isAdmin } = require('./middleware/auth');

app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users/:userId/reviews', reviewsRoutes);
app.use('/api/users/:userId/orders', ordersRoutes);
app.use('/api/users/:userId/profile', profileRoutes);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler);


/*
app.listen(PORT, function () {
    console.log(`Server is starting on port ${PORT}`);
});
*/

module.exports = app;
