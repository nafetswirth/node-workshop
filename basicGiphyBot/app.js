/*
* @Author: Dat Dev
* @Date:   2017-02-22 15:26:32
* @Last Modified by:   Stefan Wirth
* @Last Modified time: 2017-02-22 16:21:30
*/

'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const giphyService = require('./services/giphy');

const PORT = process.env.PORT || 8080;
const OK = 200;
const SERVER_ERROR = 500;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/gif', function(req, res) {
    const text = req.body.text;

    giphyService.getByTag(text)
        .then(function(giphyResponse) {
            return res.json({
                text: giphyResponse.image_url,
                response_type: 'in_channel'
            });
        })
        .catch(function(err) {
            return res.status(SERVER_ERROR).json({err: err});
        });
});

app.listen(PORT, function() {
    console.log('listening on port ' + PORT);
});