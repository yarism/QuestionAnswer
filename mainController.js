app.controller("mainController", function($scope, QAService) {
    $scope.loadingApp = true;

    initialize();

    $scope.submitAnswer = function(answer) {
        console.log("scope: ", $scope);
        console.log($scope.questionId);
        $scope.sending = true;
        return QAService.submitAnswer($scope.questionId, answer).then(function() {
            $scope.sending = false;
        });
    };

    function getQuestion() {
        return QAService.getQuestion().then(function(question) {
            $scope.question = question[0].question;
            $scope.maxLength = 130 - question[0].length;
            $scope.questionId = question[0].id;
            $scope.loadingApp = false;
        });
    }

    function initialize() {
        getQuestion();
    }
});