const express = require('express');
const router = express.Router();
const { handleShortUrl, getAnalysis } = require('../Controller/url');


router.post('/', handleShortUrl);




module.exports = router;
