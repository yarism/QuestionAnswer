app.controller("mainController", function($scope, $timeout, $location, $routeParams, QAService, focus) {
    $scope.loadingApp = true;
    initialize(false);

    $scope.submitAnswer = function(answer) {
        $scope.sending = true;
        return QAService.submitAnswer($scope.questionId, answer).then(function() {
            $scope.sent = true;
            $timeout(function() {
                initialize(true);
            }, 2000);
        });
    };

    $scope.reload = function() {
        initialize(true);
    };

    function renderQuestion(question) {
        $scope.question = question.question;
        $scope.maxLength = 130 - question.length;
        $scope.questionId = question.id;
        $scope.numberOfAnswers = question.answers;
        $scope.loadingApp = false;
        $location.search({ 'id': question.id, 'question': question.question.replace(/\s+/g, '-') });
        QAService.getAnswersForQuestion($scope.questionId).then(function(answers) {
            $scope.answers = answers;
        });
        clearData();
    }

    function getQuestion() {
        return QAService.getQuestion().then(function(question) {
            renderQuestion(question);
        });
    }

    function getQuestionById(id) {
        return QAService.getQuestionById(id).then(function(question) {
            if (question.status !== "0") {
                $scope.questionMissing = "This is not the question you are looking for";
                $scope.loadingApp = false;
            }
            else {
                renderQuestion(question);
            }
        });
    }

    function clearData() {
        $scope.sending = false;
        $scope.sent = false;
        $scope.answer = "";
        $scope.showAnswers = false;
        $scope.questionMissing = "";
    }

    function initialize(reload) {
        if ($routeParams.id && !reload) {
            getQuestionById($routeParams.id);
        }
        else {
            getQuestion();
        }
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