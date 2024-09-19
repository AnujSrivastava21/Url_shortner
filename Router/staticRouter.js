const express = require('express');
const url = require('../Model/url');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const allUrls = await url.find({});
        return res.render('home', { urls: allUrls });
    } catch (error) {
        console.error('Error fetching URLs:', error);
        return res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
 