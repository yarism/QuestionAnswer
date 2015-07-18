app.controller("mainController", function($scope) {
    console.log("hello");
    $scope.question = "How to tie a tie?";
    $scope.maxLength = 130 - $scope.question.length;
});