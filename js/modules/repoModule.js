var repoModule = angular.module('repo', ['ng', 'chart.js']);

repoModule.controller('RepoCtrl', function ($scope, $routeParams, $http, $q) {
    $scope.error = false;
    $scope.searchInProgress = true;
    $scope.notFound = false;
    $scope.repo = {};

    /**
     * Initializes data for stat chart.
     */
    $scope.initChart = function () {
        $scope.labels = ["Stars", "Forks", "Issues", "Networks", "Subscribers", "Watchers"];
        $scope.data = [[
            $scope.repo.stargazers_count,
            $scope.repo.forks_count,
            $scope.repo.open_issues_count,
            $scope.repo.networks_count,
            $scope.repo.subscribers_count,
            $scope.repo.watchers_count
        ]];
    };

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
            $scope.initChart();
        };

        var error = function () {
            $scope.searchInProgress = false;
            $scope.error = true;
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
            if (response.status === 404) {
                $scope.notFound = true;
            }
        }));

        // get issues
        promises.push($http({
            method: 'GET',
            url: 'https://api.github.com/repos/' + ownerAndRepo + '/issues'
        }).then(function issuesSuccess (response) {
            $scope.issues = response.data;
        }));

        $q.all(promises).then(finish, error);
    };

    $scope.getRepoByOwnerAndId($routeParams.owner, $routeParams.repo);
});