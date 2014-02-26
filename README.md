#Mobile First HTML5 Festival Webapp POC
> A proof of concept webapp (WIP) build with only HTML5 features to mimic a native feeling  
> [Live Demo](http://festivalapp.eu01.aws.af.cm)

##Frontend
###Lungo Framework

- HTML5, CSS3 and JavaScript
- Consistent browser environment
- Powerfull JavaScript API
- Lightweight & Scalable

[Lungo Website](http://lungo.tapquo.com) & [Lungo Docs](http://lungo.tapquo.com/documentation/#structure)

###Mobile optimizations
	
	<meta name="HandheldFriendly" content="True">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=yes">

###Disable the rubber band effect
	
	$('body').on('touchmove', function (e) {
    	var searchTerms = '.scroll, .scroll-y, .scroll-x',
        $target = $(e.target),
        parents = $target.parents(searchTerms);
        if (parents.length || $target.hasClass(searchTerms)) {
        	// ignore as we want the scroll to happen
        } else {
        	e.preventDefault();
        }
    });


##Authentication

###Google+ JavaScript API
Include the client:plusone.js library

	<script src="https://apis.google.com/js/client:plusone.js"></script>
  
Authenticate on `$( "#triggerSignIn" ).click()`
	
	$( "#triggerSignIn" ).click(function() {
    	gplus_auth();
    });

Custom gplus_auth() function: save the userdata in the Lungo Cache and redirect to the main section. **Important!** Include `https://www.googleapis.com/auth/youtube.readonly` and `https://www.googleapis.com/auth/youtube.upload` in the options scope var as we are going to use the Youtube Javascript API.

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

