function gplus_auth(){

  var loginFinished = function(authResult) {

    if (authResult['status']['signed_in']) {
      gapi.client.load('plus','v1', function(){
        var request = gapi.client.plus.people.get({
        'userId': 'me'
      });
      request.execute(function(resp) {
        var user = {id: resp.id, name: resp.name.givenName, image:resp.image.url};
        Lungo.Cache.set("userdata", user);
        Lungo.Router.section("main");
      });
    });
    } else {
      console.log(authResult['error']);
    }
  };

  var options = {
    'callback' : loginFinished,
    'approvalprompt' : 'auto',
    'clientid' : '130965801972-a6b84s35273rql7on9clm3gru5c52jda.apps.googleusercontent.com',
    'scope' : 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/plus.login',
    'requestvisibleactions' : 'http://schemas.google.com/CommentActivity http://schemas.google.com/ReviewActivity',
    'cookiepolicy' : 'single_host_origin'
  };

  gapi.auth.signIn(options);
}