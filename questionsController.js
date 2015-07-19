app.controller("questionsController", function($scope, QAService) {
    initialize();

    function getAllQuestions() {
        return QAService.getAllQuestions().then(function(questions) {
            $scope.questions = questions;
        });
    }

    function initialize() {
        getAllQuestions();
    }
});