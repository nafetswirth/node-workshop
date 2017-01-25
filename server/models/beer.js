/*
* @Author: Dat Dev
* @Date:   2017-01-25 11:41:57
* @Last Modified by:   Stefan Wirth
* @Last Modified time: 2017-01-25 12:24:05
*/

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://admin:admin@ds129179.mlab.com:29179/node-workshop');
mongoose.connection.once('open', function() {
    console.log('Connected');
})

const BeerSchema = new Schema({
    name: String,
    description: String
});

BeerSchema.set('toJSON', { getters: false, virtuals: true });

BeerSchema.virtual('id').get(function() {
    return this._id;
});

const Beer = mongoose.model('Beer', BeerSchema);

module.exports = Beer;