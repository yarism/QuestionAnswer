app.controller("mainController", function($scope, $timeout, QAService) {
    $scope.loadingApp = true;
    initialize();

    $scope.submitAnswer = function(answer) {
        $scope.sending = true;
        return QAService.submitAnswer($scope.questionId, answer).then(function() {
            $scope.sent = true;
            $timeout(function() {
                getQuestion();
            }, 3000);
        });
    };

    $scope.reload = function() {
        $scope.loadingApp = true;
        initialize();
    };

    function getQuestion() {
        return QAService.getQuestion().then(function(question) {
            $scope.question = question[0].question;
            $scope.maxLength = 130 - question[0].length;
            $scope.questionId = question[0].id;
            $scope.loadingApp = false;
            clearData();
        });
    }

    function clearData() {
        $scope.sending = false;
        $scope.sent = false;
        $scope.answer = "";
    }

    function initialize() {
        getQuestion();
    }
});