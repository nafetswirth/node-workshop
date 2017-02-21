/*
* @Author: Dat Dev
* @Date:   2017-02-21 21:48:26
* @Last Modified by:   Stefan Wirth
* @Last Modified time: 2017-02-21 22:08:37
*/

'use strict';

const request = require('request-promise');

const GIPHY_API_URL = 'http://api.giphy.com/v1/gifs/random';
const GIPHY_API_KEY = 'dc6zaTOxFJmzC';

module.exports = {
    getRandomWithTag: getRandomWithTag
}

function getRandomWithTag(tag) {
    return request({
        uri: GIPHY_API_URL,
        qs: {
            api_key: GIPHY_API_KEY,
            tag: tag
        },
        json: true
    })
    .then(function(res) {
        return Promise.resolve(res.data);
    });
}