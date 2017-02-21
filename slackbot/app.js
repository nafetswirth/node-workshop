/*
* @Author: Dat Dev
* @Date:   2017-02-21 21:45:49
* @Last Modified by:   Stefan Wirth
* @Last Modified time: 2017-02-21 22:24:01
*/

'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const giphyService = require('./services/giphy');

const PORT = process.env.PORT || 1338;

const app = express();

app.use(bodyParser.json());

app.post('/gifmestuff', function(req, res) {
    const tag = req.body.text;

    giphyService.getRandomWithTag(tag)
        .then(function(giphyResponse) {
            return res.status(200).json({text: giphyResponse.image_original_url});
        })
        .catch(function(err) {
            console.error(err);
            return res.status(500).json({err: err});
        });
});

app.listen(PORT, function() {
    console.log('listening on port ' + PORT);
});