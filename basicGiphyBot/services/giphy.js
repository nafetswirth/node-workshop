/*
* @Author: Dat Dev
* @Date:   2017-02-22 15:42:35
* @Last Modified by:   Stefan Wirth
* @Last Modified time: 2017-02-22 16:14:09
*/

'use strict';

module.exports = {
    getByTag: getByTag
};

const request = require('request-promise');

const GIPHY_API_URL = 'http://api.giphy.com/v1/gifs/random';
const GIPHY_API_KEY = 'dc6zaTOxFJmzC';

function getByTag(tag) {
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
    //return Promise.resolve({url: 'http://google.com'});
}