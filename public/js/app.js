var jumbooks_mod = angular.module('jumbooks_mod', ['ngAnimate']);

jumbooks_mod.run(['$rootScope', '$window', function($rootScope, $window)  {
    $window.fbAsyncInit = function() {
        FB.init({
            appId: '1368300386515295',
            status: true,
            cookie: true,
            xfbml: true,
            version: 'v2.7'
        });
    };

    (function(d, s, id) {
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

jumbooks_mod.controller('jumbooks_ctrl', ['$scope', '$window', '$http', function($scope, $window, $http) {

    to_default();

    /* Buy functions */

    $scope.selected_buy = function() {
    	$scope.buy_mode = {};
    };

    $scope.buy_toggle_expansion = function(index) {
        if (!$scope.buy_mode.books[index].expand) {
            $scope.buy_mode.books[index].expand = true;
        } else {
            $scope.buy_mode.books[index].expand = false;
        }
    };

    $scope.contact_seller = function() {

        //TODO: Contact seller via Facebook

    }

    $scope.search_books = function() {
        $http({
            method: 'GET',
            url: "http://localhost:8000/search?" + "book_name=" + $scope.buy_mode.search_text
        }).then(function success(response) {
            $scope.buy_mode.books = response.data;
        }, function error(response) {
            console.log("ERROR");
        });
    };

    /* Sell functions */

    $scope.selected_sell = function() {
        $scope.sell_mode = {
            'new_book_mode': true
        };
    };

    $scope.selected_new_book_mode = function() {
        $scope.sell_mode.new_book_mode = {};
        $scope.sell_mode.my_books_mode = null;
    };

    $scope.selected_my_books_mode = function() {
        $scope.sell_mode.my_books_mode = {};
        $scope.sell_mode.new_book_mode = null;
    };

    $scope.add_book_entry = function() {
        $scope.sell_mode.my_books_mode = {};
        $scope.sell_mode.new_book_mode = null;

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

    $scope.sell_toggle_expansion = function(index) {
        if (!$scope.sell_mode.my_books_mode.books[index].expand) {
            $scope.sell_mode.my_books_mode.books[index].expand = true;
        } else {
            $scope.sell_mode.my_books_mode.books[index].expand = false;
        }
    };

    $scope.resolve_book_entry = function() {

    };

    $scope.search_my_books = function() {
        $http({
            method: 'GET',
            url: "http://localhost:8000/search?" + "seller_id=" + "1234" + "&book_name=" + $scope.sell_mode.my_books_mode.search_text
        }).then(function success(response) {
            $scope.sell_mode.my_books_mode.books = response.data;
        }, function error(response) {
            console.log("ERROR");
        });
    };

    /* General functions */

    function to_default(){
        $scope.buy_mode = null;
        $scope.sell_mode = null;
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

    $scope.key_press_enter = function(keyEvent) {
        if (keyEvent.which === 13) {
            if ($scope.buy_mode) {
                $scope.search_books();
            }
            else if ($scope.sell_mode.my_books_mode) {
                $scope.search_my_books();
            }
        }
    }

    $scope.FBLogin = function() {
        FB.getLoginStatus(function(response) {
            if (response.status != 'connected') {
                FB.login(function(response) {
                    if (response.authResponse) {
                        console.log("Welcome! Fetching your information....");
                        FB.api('/me', function(response) {
                            console.log("Good to see you," + response.name + '.');
                        });
                    } else {
                        console.log("User cancelled login or did not fuly authorized.");
                    }
                });
            }
        });
    };

    $scope.resolve_book_entry = function(book) {
        $http({
            method: 'DELETE',
            url: "http://localhost:8000/delete?book_id=" + book._id
        }).then(function success(response) {
            console.log(response);
        }, function error(response) {
            console.log("ERROR");
        });

        book.hidden = true;
    };
}]);