/*
* @Author: Thomas Kistel
* @Date:   2017-02-22 11:33:46
* @Last Modified by:   Stefan Wirth
* @Last Modified time: 2017-02-22 22:58:15
*/

'use strict';

//dependencies

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//global
const PORT = process.env.PORT || 8080;
const OK = 200;
const CREATED = 201;
const NOT_FOUND = 404;

//variables
const app = express();

var beers = [
    {id: 1, name: 'Sternburg', description: 'Bier'},
    {id: 2, name: 'Berliner Pilsener', description: 'More Bier'}
];

app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
    const header = req.headers.authorization;
    if(!header) {
        res.status(401).json({err: 'Not auth header'});
        next({err: 'Not auth header'});
    } else {
        next();
    }
});

app.get('/api/beers', function(req, res) {
    return res.json(beers);
});

app.get('/api/beers/:id', function(req, res) {
    const id = req.params.id;
    const beer = beers.filter(function(beer) {
        return beer.id === parseInt(id); 
    }).shift();

    if(!beer) {
        return res.status(NOT_FOUND).json({err: 'No such beer. ask bernd'});
    }
    return res.json(beer);
});

app.post('/api/beers', function(req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const newId = beers.length + 1;
    const newBeer = {
        id: newId,
        name: name,
        description: description
    };
    beers.push(newBeer);
    return res.status(CREATED).json(newBeer);
});

app.post('/api/beers/:id', function(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;

    var beer = beers.filter(function(beer) {
        return beer.id === parseInt(id); 
    }).shift();
    
    if(!beer) {
        return res.status(NOT_FOUND).json({err: 'No such beer. ask bernd'});
    }

    if(name) {
        beer.name = name;
    }

    if(description !== undefined) {
        beer.description = description;
    }

    const index = beers.indexOf(function(beer) {
        return beer.id === parseInt(id); 
    });

    if(!index) {
        return res.status(NOT_FOUND).json({err: 'No such beer. ask bernd'});
    }

    beers[index] = beer;

    return res.json(beer);
});


app.delete('/api/beers/:id', function(req, res) {
    const id = req.params.id;

    beers = beers.filter(function(beer) {
        return beer.id !== parseInt(id); 
    });

    return res.json({});
});

app.listen(PORT, function() {
    console.log('listening on ' + PORT);
});