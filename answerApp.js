var app = angular.module("answerApp", ['ngRoute']);

app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'templates/main.html',
        controller: 'mainController',
        reloadOnSearch: false
    })
    .otherwise({
        redirectTo: '/'
    });
});