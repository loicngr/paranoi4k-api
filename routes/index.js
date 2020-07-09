const express = require('express');
const router = express.Router();
const fs = require('fs');

function readFile() {
    const rawData = fs.readFileSync('data.json');
    return JSON.parse(rawData);
}

/* GET twitch listing. */
router.get('/twitch', function(req, res, next) {
    const fileContent = readFile();
    res.json(fileContent);
});

/* GET youtube listing. */
router.get('/youtube', function(req, res, next) {
    res.json({status: 'WIP'});
});

module.exports = router;