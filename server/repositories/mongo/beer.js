/*
* @Author: Dat Dev
* @Date:   2017-01-25 11:49:26
* @Last Modified by:   Stefan Wirth
* @Last Modified time: 2017-01-25 12:17:10
*/

'use strict';

const Beer = require('../../models/beer');

module.exports = {
    get: get,
    getOne: getOne,
    save: save,
    create: create,
    destroy: destroy
}

function get() {    
    return Beer
        .find()
        .exec();
}

function getOne(id) {
    return Beer
        .findOne({_id: id})
        .exec();
}

function save(id, beer) {
    return Beer.update({_id: id}, beer);
}

function create(beer) {
    return Beer.create(beer);
}

function destroy(id) {
    return Beer.remove({_id: id});
}