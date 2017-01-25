/*
* @Author: herby
* @Date:   2017-01-24 22:00:39
* @Last Modified by:   Stefan Wirth
* @Last Modified time: 2017-01-25 12:10:45
*/

'use strict';

module.exports = {
    get: get,
    getOne: getOne,
    save: save,
    create: create,
    destroy: destroy
}

const beers = {
    1: {
        id: 1,
        name: 'Berliner Pilsener',
        description: 'Dat pilsener doe'
    },
    2: {
        id: 2,
        name: 'Sternburg Export',
        description: 'Dat export doe'
    }
};

function get() {
    const allBeers = Object.keys(beers).map((key) => {
        return beers[key];
    });
    return Promise.resolve(allBeers);
}

function getOne(id) {
    const beer = beers[id];
    return Promise.resolve(beer);
}

function save(id, beer) {
    beers[id] = beer;
    return Promise.resolve(beer);
}

function create(beer) {
    const newId = Object.keys(beers).length + 1;
    beer.id = newId;
    beers[beer.id] = beer;
    return Promise.resolve(beer);
}

function destroy(id) {
    const beer = beers[id];
    delete beers[id];
    return Promise.resolve(beer);
}