var fb_mod = angular.module('fb_mod', []);

fb_mod.run(['$rootScope', '$window', function($rootScope, $window) {
    console.log("init");
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
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}]);

fb_mod.controller('fb_ctrl', ['$scope', '$window', function($scope, $window) {
	console.log("ctrl");
    FB.login(function(response) {
        if (response.status === 'connected') {
        	console.log("logged in");
        }
    });
}]);