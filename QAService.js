(function () {
    'use strict';

    angular.module('answerApp')

    .factory('QAService', ['$http', '$q', function ($http, $q) {

        return {
            getQuestion: getQuestion,
            getQuestionById: getQuestionById,
            getAllQuestions: getAllQuestions,
            submitAnswer: submitAnswer,
            getAnswersForQuestion: getAnswersForQuestion
        };

        function getQuestion() {
            var def = $q.defer();
            $http.get("./QAService/?action=getUnansweredQuestion")
                .success(function(data) {
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get question");
                });
            return def.promise;
        }

        function getQuestionById(id) {
            var def = $q.defer();
            $http({
                    method: "GET",
                    url: "./QAService/?action=getQuestionById",
                    params: {id: id}
                })
                .success(function(data) {
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get question");
                });
            return def.promise;
        }

        function getAllQuestions() {
            var def = $q.defer();
            $http.get("./QAService/?action=getAllQuestions")
                .success(function(data) {
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get questions");
                });
            return def.promise;
        }

        function submitAnswer(id, answer) {
            var def = $q.defer();
            $http({
                    method: 'POST',
                    url: './QAService/?action=submitAnswer',
                    data: "qid=" + id + "&answer=" + answer,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .success(function(data) {
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to submit answer");
                });
            return def.promise;
        }

        function getAnswersForQuestion(id) {
            var def = $q.defer();
            $http({
                    method: "GET",
                    url: "./QAService/?action=getAnswersForQuestion",
                    params: {qid: id}
                })
                .success(function(data) {
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get answers");
                });
            return def.promise;
        }

    }]);
})();
