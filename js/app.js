/*global angular */

/**
 * GitHub Search main Angular module.
 *
 * @type {angular.Module}
 */
angular.module('githubsearch', ['ngRoute', 'index', 'search'])
    .config(function ($routeProvider) {
        'use strict';

        var indexRouteConfig = {
            controller: 'IndexCtrl',
            templateUrl: 'githubsearch-tpl-index'
        };

        var searchRouteConfig = {
            controller: 'SearchCtrl',
            templateUrl: 'githubsearch-tpl-search-in-progress'
        };

        $routeProvider
            .when('/', indexRouteConfig)
            .when('/search/:repo', searchRouteConfig)
            .otherwise({
                redirectTo: '/'
            });
    });