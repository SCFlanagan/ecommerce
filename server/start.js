const app = require('./start');
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`Server is starting on port ${PORT}`);
});