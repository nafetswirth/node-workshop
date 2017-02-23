/*
* @Author: herby
* @Date:   2017-01-24 21:54:33
* @Last Modified by:   Stefan Wirth
* @Last Modified time: 2017-02-22 15:11:55
*/

'use strict';

const express = require('express');

const beerRouter = express.Router();

const OK = 200;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports = BeerRouter;

function BeerRouter(beerRepository) {
    beerRouter.get('/', function(req, res) {
        beerRepository.get()
            .then(function(allBeers) {
                return res.status(OK).json({data: allBeers});
            })
            .catch(function(err) {
                return res.status(SERVER_ERROR).json({err: err});
            });
    });

    beerRouter.get('/:id', function(req, res) {
        const id = req.params.id;
        
        beerRepository.getOne(id)
            .then(function(beer) {
                if(!beer) {
                    return res.status(NOT_FOUND).json({});
                } else {
                    return res.status(OK).json({data: beer});
                }
            })
            .catch(function(err) {
                return res.status(SERVER_ERROR).json({err: err});
            });
    });

    beerRouter.post('/', function(req, res) {
        const beer = req.body;
        
        beerRepository.create(beer)
            .then(function(beer) {
                return res.status(OK).json({data: beer});
            })
            .catch(function(err) {
                return res.status(SERVER_ERROR).json({err: err});
            });
    });

    beerRouter.post('/:id', function(req, res) {
        const id = req.params.id;
        const beer = req.body;
        
        beerRepository.save(id, beer)
            .then(function(beer) {
                return res.status(OK).json({data: beer});
            })
            .catch(function(err) {
                return res.status(SERVER_ERROR).json({err: err});
            });
    });

    beerRouter.delete('/:id', function(req, res) {
        const id = req.params.id;
        
        beerRepository.destroy(id)
            .then(function(beer) {
                if(!beer) {
                    return res.status(NOT_FOUND).json({});
                } else {
                    return res.status(OK).json({data: beer});
                }
            })
            .catch(function(err) {
                return res.status(SERVER_ERROR).json({err: err});
            });
    });

    return beerRouter;
}