var searchModule = angular.module('search', ['ng']);

searchModule.controller('SearchCtrl', function ($scope, $routeParams, $http) {
    $scope.error = false;
    $scope.term = decodeURI($routeParams.repo);
    $scope.searchInProgress = true;
    $scope.found = 0;
    $scope.repositories = [];

    /**
     * Search through GitHub API.
     *
     * @param term
     */
    $scope.searchRepositoriesByTerm = function(term) {
        $scope.searchInProgress = true;
        $scope.error = false;

        $http({
            method: 'GET',
            url: 'https://api.github.com/search/repositories?q=' + encodeURI(term),
        }).then(function successCallback(response) {
            console.log(response);
            $scope.found = response.data.total_count;
            $scope.repositories = response.data.items;
            $scope.searchInProgress = false;
        }, function errorCallback(response) {
            $scope.error = true;
        });
    };

    $scope.searchRepositoriesByTerm($routeParams.repo);
});