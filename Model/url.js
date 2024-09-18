const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        unique: true,
        required: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [{
        timeStamp: {
            type: Number
        }
    }]
}, { timestamps: true });

const url = mongoose.model("url", urlSchema);
module.exports = url;
