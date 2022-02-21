const mongoose = require('mongoose');
const mongoConnectionString = process.env.JEST_WORKER_ID ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;

mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect(mongoConnectionString,
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