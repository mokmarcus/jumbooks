var jumbooks_mod = angular.module('jumbooks_mod', ['ngAnimate']);

/* This the "main function": it runs before everything else */
jumbooks_mod.run(['$rootScope', '$window', function($rootScope, $window) {
    $window.fbAsyncInit = function () {
        FB.init({
            appId: '1368300386515295',
            status: true,
            cookie: true,
            xfbml: true,
            version: 'v2.7'
        });
        
        check_login_status();

        // FB.Event.subscribe('auth.statusChange', function(response) {
        //     console.log(response);
        //     // $rootScope.$broadcast("fb_statusChange", {'status': response.status});
        // });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

}]);

function check_login_status() {
    FB.getLoginStatus(function(response) {
        console.log(response);
        // if (response.status === 'connected') {
        //     logged_in();
        // }
        // else {
        //     logged_out();
        // }
    }, true);   
}

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
    };

    $scope.selected_my_books_mode = function() {
        $scope.my_books_mode = true;
        $scope.new_book_mode = false;
    };

    $scope.add_book_entry = function() {
        $scope.my_books_mode = true;
        $scope.new_book_mode = false;

        //For Testing
        $scope.input.seller_name = "Marcus Mok";
        $scope.input.seller_id = "12345";

        var book_info = "book_name=" + $scope.input.book_name
                      + "&book_author=" + $scope.input.book_author
                      + "&book_volume=" + $scope.input.book_volume
                      + "&book_edition=" + $scope.input.book_edition
                      + "&book_condition=" + $scope.input.book_condition
                      + "&book_price=" + $scope.input.book_price
                      + "&seller_name=" + $scope.input.seller_name
                      + "&seller_id=" + $scope.input.seller_id
                      + "&class_name=" + $scope.input.class_name
                      + "&class_id=" + $scope.input.class_id
                      + "&class_prof=" + $scope.input.class_prof;

        $http({
            method: 'POST', 
            url: "http://localhost:8000/add",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: book_info
        }).then(function success(response) {
            console.log("SUCCESS");
            $scope.input = null;
        }, function error(response) {
            console.log("ERROR");
        });
    };

    $scope.sell_toggle_expansion = function() {
        $scope.sell_result_expanded = !($scope.sell_result_expanded);
    };

    $scope.resolve_book_entry = function() {

    };

    /* General functions */

    function to_default(){
        $scope.buy_clicked = false;
        $scope.sell_clicked = false;
        $scope.my_books_mode = false;
        $scope.new_book_mode = false;
        $scope.buy_result_expanded = false;
        $scope.sell_result_expanded = false;
        $scope.search_text = null;
        $scope.books = null;
    }

    $scope.back = function() {
        to_default();
    };

    $scope.home = function() {
        var landing_url = "http://" + $window.location.host;
        $window.location.href = landing_url;
    };

    $scope.about = function() {
        var about_url = "http://" + $window.location.host + "/partial/about.html";
        $window.location.href = about_url;
    };

    $scope.contact = function() {
        var contact_url = "http://" + $window.location.host + "/partial/contact.html";
        $window.location.href = contact_url;
    };

    $scope.key_press_enter = function(keyEvent, mode) {
        if (keyEvent.which === 13) {
            if ($scope.buy_clicked) {
                $scope.search_books();
            }
            else if ($scope.sell_clicked && $scope.my_books_mode) {
                $scope.search_my_books();
            }
        }
    }

    $scope.search_books = function() {
        $http({
            method: 'GET',
            url: "http://localhost:8000/search?" + "book_name=" + $scope.search_text
        }).then(function success(response) {
            $scope.books = response.data;
        }, function error(response) {
            console.log("ERROR");
        });
    };

    $scope.search_my_books = function() {
        $http({
            method: 'GET',
            url: "http://localhost:8000/search?" + "seller_id=" + "12345" + "&book_name=" + $scope.search_text
        }).then(function success(response) {
            $scope.books = response.data;
        }, function error(response) {
            console.log("ERROR");
        });
    };
}]);