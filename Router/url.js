const express = require('express');
const router = express.Router();
const { handleShortUrl } = require('../Controller/url'); // Adjust the path if necessary

// Handle URL form submission
router.post('/', handleShortUrl);

module.exports = router;
