var jumbooks_mod = angular.module('jumbooks_mod', ['ngAnimate']);

/* This the "main function": it runs before everything else */
jumbooks_mod.run(['$rootScope', '$window', function($rootScope, $window) {

    $rootScope.user = {};

    $window.fbAsyncInit = function() {
        FB.init({
            appId: '1368300386515295',
            status: true,
            cookie: true,
            xfbml: true,
            version: 'v2.7'
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js&version=v2.7";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

}]);

jumbooks_mod.controller('jumbooks_ctrl', ['$scope', '$window', '$http', function($scope, $window, $http) {

    to_default();

    /* Buy functions */

    $scope.selected_buy = function() {
    	$scope.buy_clicked = true;
    };

    $scope.buy_toggle_expansion = function() {
        $scope.buy_result_expanded = !($scope.buy_result_expanded);
    };

    $scope.contact_seller = function() {

        //TODO: Contact seller via Facebook

    }

    /* Sell functions */

    $scope.selected_sell = function() {
    	$scope.sell_clicked = true;
        $scope.new_book_mode = true;
    };

    $scope.selected_new_book_mode = function() {
        $scope.new_book_mode = true;
        $scope.my_books_mode = false;
    }

    $scope.selected_my_books_mode = function() {
        $scope.my_books_mode = true;
        $scope.new_book_mode = false;
    }

    $scope.add_book_entry = function() {
        $scope.my_books_mode = true;
        $scope.new_book_mode = false;

        //TODO: Add book

        $scope.input = null;
    }

    $scope.sell_toggle_expansion = function() {
        $scope.sell_result_expanded = !($scope.sell_result_expanded);
    };

    $scope.resolve_book_entry = function() {

        //TODO: Remove book

    }

    /* General functions */

    function to_default(){
        $scope.buy_clicked = false;
        $scope.sell_clicked = false;
        $scope.my_books_mode = false;
        $scope.new_book_mode = false;
        $scope.buy_result_expanded = false;
        $scope.sell_result_expanded = false;
    }

    $scope.back = function() {
        to_default();
    };

    $scope.home = function() {
        var landingUrl = "http://" + $window.location.host;
        $window.location.href = landingUrl;
    };

    $scope.about = function() {
        var aboutUrl = "http://" + $window.location.host + "/partial/about.html";
        $window.location.href = aboutUrl;
    };

    $scope.contact = function() {
        var contactUrl = "http://" + $window.location.host + "/partial/contact.html";
        $window.location.href = contactUrl;
    };

    $scope.keypressEnter = function(keyEvent) {
        if (keyEvent.which === 13) {
            $scope.search();
        }
    }

    $scope.search = function() {
        $http({
            method: 'GET', 
            url: "http://localhost:8000/search?" + "book_name=" + $scope.searchText
        }).then(function success(response) {
            $scope.books = response.data;
        }, function error(response) {
            console.log("ERROR");
        });
    };
}]);