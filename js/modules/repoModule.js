var repoModule = angular.module('repo', ['ng']);

repoModule.controller('RepoCtrl', function ($scope, $routeParams, $http, $q) {
    $scope.error = false;
    $scope.searchInProgress = true;
    $scope.notFound = false;
    $scope.repo = {};

    /**
     * Get repo by owner and ID through GitHub API.
     *
     * @param term
     */
    $scope.getRepoByOwnerAndId = function(owner, repo) {
        var ownerAndRepo = encodeURI(owner) + '/' + encodeURI(repo);
        var promises = [];

        var finish = function (){
            $scope.searchInProgress = false;
        };

        $scope.searchInProgress = true;
        $scope.error = false;
        $scope.notFound = false;

        // get repo
        promises.push($http({
            method: 'GET',
            url: 'https://api.github.com/repos/' + ownerAndRepo,
        }).then(function repoSuccess(response) {
            if (!response.data.id) {
                $scope.notFound = true;
                return;
            }

            $scope.repo = response.data;
        }, function repoError (response) {
            $scope.error = true;
        }));

        // get issues
        promises.push($http({
            method: 'GET',
            url: 'https://api.github.com/repos/' + ownerAndRepo + '/issues'
        }).then(function issuesSuccess (response) {
            $scope.issues = response.data;
        }), function issuesError (response) {
            $scope.error = true;
        });

        $q.all(promises).then(finish);
    };

    $scope.getRepoByOwnerAndId($routeParams.owner, $routeParams.repo);
});