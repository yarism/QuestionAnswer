app.controller("questionsController", function($scope, QAService) {
    initialize();

    function getAllQuestions() {
        return QAService.getAllQuestions().then(function(questions) {
            console.log(questions);
            $scope.questions = questions;
        });
    }

    function initialize() {
        getAllQuestions();
    }
});