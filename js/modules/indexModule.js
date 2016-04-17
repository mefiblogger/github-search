var indexModule = angular.module('index', ['ng']);

indexModule.controller('IndexCtrl', function ($scope, $location) {
    /**
     * Searching repositories containing the given searchterm.
     *
     * @param searchterm
     */
    $scope.search = function (searchterm) {
        $location.path('search/' + encodeURI(searchterm.repo));
    };

    /**
     * Feeling lucky feature
     *
     * Searching repositories containing the word "KoviBusz".
     */
    $scope.lucky = function () {
        $location.path('search/KoviBusz');
    };
});