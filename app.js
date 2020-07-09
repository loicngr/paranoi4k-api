const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const {TwitchApi} = require('./api/twitchRequests.js');
const {YoutubeApi} = require('./api/youtubeRequest.js');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

const twitchApi = new TwitchApi();
const youtubeApi = new YoutubeApi();
function intervalApi() {
    twitchApi.user
    .then(user => {
        fs.writeFile ("twitch.json", JSON.stringify(user.response), function(err) {
                if (err) throw err;
            }
        );
    });
    youtubeApi.lastVideo
    .then(video => {
        fs.writeFile ("youtube.json", JSON.stringify(video.response), function(err) {
                if (err) throw err;
            }
        );
    });
}
intervalApi();
setInterval(() => {
    intervalApi();
}, 120000);

module.exports = app;
