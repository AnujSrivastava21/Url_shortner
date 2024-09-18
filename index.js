const express = require('express');
const databaseConnection = require('./DB/connection');
const urlRoute = require('./Router/url');
const { getShortURl, getAnalysis } = require('./Controller/url');
const app = express();

// MongoDB connection
databaseConnection("mongodb://127.0.0.1:27017/URL_SHORTNER");

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome Back Again");
});

app.get('/:shortId',getShortURl);
app.get('/analytics/:shortId', getAnalysis);

// URL route
app.use('/url', urlRoute);

// Start server
app.listen(8000, (err) => {
    if (err) {
        console.log("Error in starting server:", err);
    } else {
        console.log("Server is running on port 8000");
    }
});
