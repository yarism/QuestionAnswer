var app = angular.module("answerApp", ['ngRoute']);

app.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'templates/main.html',
            controller: 'mainController'
        })
        .when('/:questionId/:question', {
            templateUrl: 'templates/main.html',
            controller: 'mainController'
        })
        .when('/questions', {
            templateUrl: 'templates/questions.html',
            controller: 'questionsController'
        })
        .otherwise({
            redirectTo: '/'
        });
});