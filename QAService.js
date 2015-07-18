(function () {
    'use strict';

    angular.module('answerApp')

    .factory('QAService', ['$http', '$q', function ($http, $q) {

        return {
            getQuestion: getQuestion,
            submitAnswer: submitAnswer
        };

        function getQuestion() {
            var def = $q.defer();
            $http.get("http://www.rly.nu/projects/gp/?action=getUnansweredQuestion")
                .success(function(data) {
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get question");
                });
            return def.promise;
        }

        function submitAnswer(id, answer) {
            var def = $q.defer();
            $http({
                    method: 'POST',
                    url: 'http://www.rly.nu/projects/gp/?action=submitAnswer',
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

    }]);
})();
