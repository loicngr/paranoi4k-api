const express = require('express');
const router = express.Router();
const fs = require('fs');

function readFile(fileName) {
    const rawData = fs.readFileSync(fileName);
    return JSON.parse(rawData);
}

router.get('/', function(req, res, next) {
    res.json({status: false});
});

/* GET twitch listing. */
router.get('/twitch', function(req, res, next) {
    const fileContent = readFile('twitch.json');
    res.json(fileContent);
});

/* GET youtube listing. */
router.get('/youtube', function(req, res, next) {
    const fileContent = readFile('youtube.json');
    res.json(fileContent);
});

module.exports = router;