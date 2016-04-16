/*global angular */

/**
 * GitHub Search main Angular module.
 *
 * @type {angular.Module}
 */
angular.module('githubsearch', ['ngRoute', 'index'])
    .config(function ($routeProvider) {
        'use strict';

        var indexRouteConfig = {
            controller: 'IndexCtrl',
            templateUrl: 'githubsearch-index.html',
        };

        $routeProvider
            .when('/', indexRouteConfig)
            .otherwise({
                redirectTo: '/'
            });
    });