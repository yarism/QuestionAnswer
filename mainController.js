app.controller("mainController", function($scope, $timeout, $location, QAService, focus) {
    $scope.loadingApp = true;
    initialize();

    $scope.submitAnswer = function(answer) {
        $scope.sending = true;
        return QAService.submitAnswer($scope.questionId, answer).then(function() {
            $scope.sent = true;
            $timeout(function() {
                initialize();
            }, 2000);
        });
    };

    $scope.reload = function() {
        initialize();
    };

    function getQuestion() {
        return QAService.getQuestion().then(function(question) {
            console.log(question);
            $scope.question = question[0].question;
            $scope.maxLength = 130 - question[0].length;
            $scope.questionId = question[0].id;
            $scope.numberOfAnswers = question[0].answers;
            $scope.loadingApp = false;
            $location.search('question', $scope.question.replace(/\s+/g, '-'));
            clearData();
            //$location.url('/' + $scope.question);
        });
    }

    function clearData() {
        $scope.sending = false;
        $scope.sent = false;
        $scope.answer = "";
    }

    function initialize() {
        getQuestion();
        focus('focusMe');
    }
});

app.directive('focusOn', function() {
    return function(scope, elem, attr) {
        scope.$on('focusOn', function(e, name) {
            if(name === attr.focusOn) {
                elem[0].focus();
            }
        });
    };
});

app.factory('focus', function ($rootScope, $timeout) {
    return function(name) {
        $timeout(function (){
            $rootScope.$broadcast('focusOn', name);
        });
    };
});