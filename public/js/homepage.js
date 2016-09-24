var app = angular.module('jumbooks_app', ['ngAnimate']);

app.controller('jumbooks_ctrl', ['$scope', '$window', function($scope, $window) {
    $scope.buy_clicked = false;
    $scope.sell_clicked = false;
    $scope.clickedBuy = function() {
    	$scope.buy_clicked = true;
    };
    $scope.clickedSell = function() {
    	$scope.sell_clicked = true;
    };
    $scope.back = function() {
        $scope.buy_clicked = false;
        $scope.sell_clicked = false;
    }
    $scope.home = function() {
        var landingUrl = "http://" + $window.location.host;
        $window.location.href = landingUrl;
    }
    $scope.about = function() {
        var aboutUrl = "http://" + $window.location.host + "/about";
        $window.location.href = aboutUrl;
    }
    $scope.contact = function() {
        var contactUrl = "http://" + $window.location.host + "/contact";
        $window.location.href = contactUrl;
    }
}]);