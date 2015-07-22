app.controller("rootController", function($scope, $sce) {
    $scope.trustAsHtml = $sce.trustAsHtml;
});