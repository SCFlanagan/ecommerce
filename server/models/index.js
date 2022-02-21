require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect('mongodb+srv://ecommerce:wg4t3zaC516aezqx@cluster0.ylvku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error: "));
db.once("open", function () {
    console.log("DB connected successfully");
});

module.exports.User = require('./user');
module.exports.Review = require('./review');
module.exports.Product = require('./product');
module.exports.Profile = require('./profile');
module.exports.Order = require('./order');