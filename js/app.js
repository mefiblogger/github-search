/*global angular */

/**
 * GitHub Search main Angular module.
 *
 * @type {angular.Module}
 */
angular.module('githubsearch', ['ngRoute', 'index', 'search', 'repo'])
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

        var repoRouteConfig = {
            controller: 'RepoCtrl',
            templateUrl: 'githubsearch-tpl-repo'
        };

        $routeProvider
            .when('/', indexRouteConfig)
            .when('/search/:repo', searchRouteConfig)
            .when('/repo/:owner/:repo', repoRouteConfig)
            .otherwise({
                redirectTo: '/'
            });
    });