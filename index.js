const express = require('express');
const path = require('path')
const databaseConnection = require('./DB/connection');
const urlRoute = require('./Router/url');
const staticRouter = require('./Router/staticRouter')
const { getShortURl, getAnalysis } = require('./Controller/url');
const url = require('./Model/url');
const app = express();



// MongoDB connection
databaseConnection("mongodb://127.0.0.1:27017/URL_SHORTNER");

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.get('/' , staticRouter);      

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
