'use strict';

/**
 * @ngdoc overview
 * @name nodeWorkshopApp
 * @description
 * # nodeWorkshopApp
 *
 * Main module of the application.
 */
angular
  .module('nodeWorkshopApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'BeerCtrl',
        controllerAs: 'vm'
      })
      .when('/beers/new', {
        templateUrl: 'views/beerDetail.html',
        controller: 'NewBeerCtrl',
        controllerAs: 'vm'
      })
      .when('/beers/:id', {
        templateUrl: 'views/beerDetail.html',
        controller: 'BeerDetailCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
