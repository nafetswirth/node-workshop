/*
* @Author: herby
* @Date:   2017-01-24 15:52:20
* @Last Modified by:   Stefan Wirth
* @Last Modified time: 2017-02-21 20:46:40
*/

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const memoryBeerRepository = require('./repositories/memory/beer');
const mongoBeerRepositroy = require('./repositories/mongo/beer');
const beerRoutes = require('./routes/beer');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(cors());

//serves all routes under /api
app.use('/api/beers', beerRoutes(memoryBeerRepository));

app.listen(PORT, function() {
    console.log('Server is listening on PORT ' + PORT);
});