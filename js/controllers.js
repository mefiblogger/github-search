var indexModule = angular.module('index', ['ng']);

indexModule.controller('IndexCtrl', function ($scope, $location) {
    /**
     * Searching repositories containing the given searchterm.
     *
     * @param searchterm
     */
    $scope.search = function (searchterm) {
        $location.path('search/' + searchterm.repo);
    };

    /**
     * Feeling lucky feature
     *
     * Searching repositories containing the word "mefiblogger".
     */
    $scope.lucky = function () {
        $location.path('search/mefiblogger');
    };
});