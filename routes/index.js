const express = require('express');
const router = express.Router();
const fs = require('fs');

function readFile() {
    const rawData = fs.readFileSync('data.json');
    return JSON.parse(rawData);
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    const fileContent = readFile();
    res.json(fileContent);
});

module.exports = router;