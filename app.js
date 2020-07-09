const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const {TwitchApi} = require('./api/twitchRequests.js');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

const twitchApi = new TwitchApi();
function intervalApi() {
    api.user
    .then(user => {
        fs.writeFile ("data.json", JSON.stringify(user.response), function(err) {
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
