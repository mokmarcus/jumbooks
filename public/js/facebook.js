window.fbAsyncInit = function() {
    FB.init({
        appId      : '1368300386515295',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.7'
    });
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log("logged in");
        }
        else {
            console.log('logged out');
        }
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);         
}(document, 'script', 'facebook-jssdk'));