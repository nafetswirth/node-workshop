'use strict';

/**
 * @ngdoc function
 * @name nodeWorkshopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nodeWorkshopApp
 */
const app = angular.module('nodeWorkshopApp');

app.controller('BeerCtrl', ['beerService', function(beerService) {
    const vm = this;

    vm.destroy = destroy;

    init();

    function init() {
        beerService.get()
            .then(function(beers) {
                vm.beers = beers;
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    function destroy(beer) {
        const beerId = beer.id;
        beerService.destroy(beerId)
            .then(function(res) {
                vm.beers = vm.beers.filter((beer) => {
                    return beer.id !== beerId
                });
            })
            .catch(function(err) {
                console.log(err);
            });
    }
}]);

app.controller('BeerDetailCtrl', ['$routeParams', '$location', 'beerService', function($routeParams, $location, beerService) {
    const vm = this;
    const beerId = $routeParams.id;

    vm.save = save;

    init();

    function init() {  
        beerService.getOne(beerId)
            .then(function(beer) {
                vm.beer = beer;
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    function save(beer) {
        beerService.saveBeer(beer)
            .then(function(savedBeer) {
                $location.path('/#!');
            })
            .catch(function(err) {
                console.log(err);
            });
    }
}]);

app.controller('NewBeerCtrl', ['$location', 'beerService', function($location, beerService) {
    const vm = this;

    vm.save = save;

    function save(beer) {
        beerService.create(beer)
            .then(function(res) {
                $location.path('/#!');
            })
            .catch(function(err) {
                console.log(err);
            });
    }
}]);

app.factory('beerService', ['$http', '$q',  function($http, $q) { 
    const baseUrl = 'http://localhost:8080/api'
    const beerBaseUrl = baseUrl + '/beers';

    //alernative is $resource
    const service = {
        get: get,
        getOne: getOne,
        create: create,
        saveBeer: save,
        destroy: destroy
    };

    return service;

    function get() {
        return $http.get(beerBaseUrl)
            .then(function(res) {
                return $q.when(res.data.data);
            });
    }

    function getOne(id) {
        const url = beerBaseUrl + '/:id'.replace(':id', id);
        return $http.get(url)
            .then(function(res) {
                return $q.when(res.data.data);
            });
    }

    function create(beer) {
        return $http.post(beerBaseUrl, beer)
            .then(function(res) {
                return $q.when(res.data.data);
            });
    }

    function save(beer) {
        const id = beer.id;
        const url = beerBaseUrl + '/:id'.replace(':id', id);
        
        return $http.post(url, beer)
            .then(function(res) {
                return $q.when(res.data.data);
            });
    }

    function destroy(id) {
        const url = beerBaseUrl + '/:id'.replace(':id', id);
        return $http.delete(url)
            .then(function(res) {
                return $q.when(res.data.data);
            });
    }
}]);