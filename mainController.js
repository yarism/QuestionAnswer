app.controller("mainController", function($scope, QAService) {
    initialize();

    $scope.submitAnswer = function(answer) {
        $scope.sending = true;
        return QAService.submitAnswer($scope.questionId, answer).then(function() {
            $scope.sending = false;
            $scope.sent = true;
        });
    };

    $scope.reload = function() {
        initialize();
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
        $scope.loadingApp = true;
        $scope.sent = false;
        $scope.answer = "";
        getQuestion();
    }
});