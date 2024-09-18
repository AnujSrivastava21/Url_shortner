const mongoose = require('mongoose');

function databaseConnection(url) {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); // Exit process if the connection fails
    });
}

module.exports = databaseConnection;
